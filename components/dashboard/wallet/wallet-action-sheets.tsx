"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { RefObject } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ArrowRight, Copy, ExternalLink, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { BankCombobox } from "@/components/dashboard/wallet/bank-combobox"
import { CategoryCombobox } from "@/components/dashboard/wallet/category-combobox"
import { constructErrorMessage } from "@/api/functions"
import {
  createPaymentRequest,
  initiateFundAccount,
  initiateTransfer,
  lookupRecipient,
  type TLookupRecipient,
} from "@/api/wallet"
import { TransactionCategory } from "@/lib/enum"
import { formatNairaWhole, nairaToKobo } from "@/lib/money"
import useWalletActionsStore, {
  type TWalletActionMode,
} from "@/stores/wallet-actions-store"
import useWalletStore from "@/stores/wallet-store"

// ─── Public entry point ────────────────────────────────────────────────────

// Tracks the SheetContent DOM node so child portals (combobox dropdowns) can
// render INSIDE the sheet rather than at body level — otherwise Radix Dialog
// treats their clicks as "outside" and swallows the selection.
const SheetContainerContext = createContext<RefObject<HTMLDivElement | null> | null>(
  null,
)

export function useSheetContainer() {
  return useContext(SheetContainerContext)
}

// Mount once per page that exposes wallet actions. Reads the active mode from
// the wallet-actions zustand store and swaps which sheet is rendered.
export function WalletActionSheets() {
  const mode = useWalletActionsStore((s) => s.mode)
  const close = useWalletActionsStore((s) => s.close)
  const sheetRef = useRef<HTMLDivElement | null>(null)

  const handleOpenChange = (open: boolean) => {
    if (!open) close()
  }

  return (
    <Sheet open={mode !== null} onOpenChange={handleOpenChange}>
      <SheetContent
        ref={sheetRef}
        className="w-full sm:max-w-md flex flex-col gap-0 overflow-y-auto p-0"
      >
        <SheetContainerContext.Provider value={sheetRef}>
          {mode === "fund" && <FundSheet />}
          {mode === "send" && <SendSheet />}
          {mode === "request" && <RequestSheet />}
        </SheetContainerContext.Provider>
      </SheetContent>
    </Sheet>
  )
}

const SHEET_TITLE: Record<TWalletActionMode, string> = {
  fund: "Fund your wallet",
  send: "Send money",
  request: "Request money",
}

const SHEET_BLURB: Record<TWalletActionMode, string> = {
  fund: "Top up via Squad checkout. We'll redirect you back when you're done.",
  send: "Outbound NIP transfer · ₦25 fee · usually settles in seconds.",
  request: "Create a shareable payment link.  Anyone with the link can pay you.",
}

function SheetShell({
  mode,
  children,
  footer,
}: {
  mode: TWalletActionMode
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <>
      <SheetHeader className="border-b border-border p-5">
        <SheetTitle>{SHEET_TITLE[mode]}</SheetTitle>
        <SheetDescription>{SHEET_BLURB[mode]}</SheetDescription>
      </SheetHeader>
      <div className="flex-1 space-y-5 px-5 py-5">{children}</div>
      {footer && (
        <SheetFooter className="border-t border-border p-5">
          {footer}
        </SheetFooter>
      )}
    </>
  )
}

// ─── FUND ──────────────────────────────────────────────────────────────────

function FundSheet() {
  const queryClient = useQueryClient()
  const close = useWalletActionsStore((s) => s.close)
  const [naira, setNaira] = useState("")

  const mutation = useMutation({
    mutationFn: initiateFundAccount,
    onSuccess: (result) => {
      toast.success("Opening secure checkout…")
      queryClient.invalidateQueries({ queryKey: ["/wallet"] })
      void useWalletStore.getState().fetchWallet()
      if (typeof window !== "undefined" && result.checkoutUrl) {
        window.open(result.checkoutUrl, "_blank", "noopener,noreferrer")
      }
      close()
    },
    onError: (error) => {
      toast.error(
        constructErrorMessage(
          error as TApiErrorResponseType,
          "Couldn't start your top-up.",
        ),
      )
    },
  })

  const kobo = nairaToKoboOrNull(naira)
  const disabled = mutation.isPending || kobo === null || kobo < 10_000

  const handleSubmit = () => {
    if (kobo === null) return
    const callbackUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/app/wallet`
        : undefined
    mutation.mutate({ amount: kobo, callbackUrl })
  }

  return (
    <SheetShell
      mode="fund"
      footer={
        <Button
          size="lg"
          className="h-11 w-full gap-2 rounded-full shadow-primary"
          disabled={disabled}
          onClick={handleSubmit}
        >
          {mutation.isPending ? <Spinner /> : <ExternalLink className="size-4" />}
          {mutation.isPending ? "Starting" : "Continue to checkout"}
        </Button>
      }
    >
      <NairaAmountInput
        value={naira}
        onChange={setNaira}
        helper="Minimum ₦100."
        autoFocus
      />
    </SheetShell>
  )
}

// ─── SEND ──────────────────────────────────────────────────────────────────

function SendSheet() {
  const queryClient = useQueryClient()
  const close = useWalletActionsStore((s) => s.close)
  const prefill = useWalletActionsStore((s) => s.prefillRecipient)
  const sheetContainer = useSheetContainer()

  const [bankCode, setBankCode] = useState(prefill?.bankCode ?? "")
  const [accountNumber, setAccountNumber] = useState(
    prefill?.accountNumber ?? "",
  )
  // Only treat the prefill as verified if it carries both the bankCode and
  // accountNumber the backend needs — otherwise the user must re-lookup.
  const [verified, setVerified] = useState<TLookupRecipient | null>(
    prefill && prefill.bankCode
      ? {
          accountName: prefill.name,
          accountNumber: prefill.accountNumber,
          bankCode: prefill.bankCode,
        }
      : null,
  )
  const [naira, setNaira] = useState("")
  const [remark, setRemark] = useState("")
  const [category, setCategory] = useState<TransactionCategory | "">("")

  // Clear the verified recipient as soon as the user edits inputs — otherwise
  // they could submit a transfer for an account number that no longer matches.
  useEffect(() => {
    if (!verified) return
    if (
      verified.accountNumber !== accountNumber ||
      verified.bankCode !== bankCode
    ) {
      setVerified(null)
    }
  }, [accountNumber, bankCode, verified])

  const lookupMutation = useMutation({
    mutationFn: lookupRecipient,
    onSuccess: (result) => setVerified(result),
    onError: (error) =>
      toast.error(
        constructErrorMessage(
          error as TApiErrorResponseType,
          "Couldn't verify that account.",
        ),
      ),
  })

  const transferMutation = useMutation({
    mutationFn: initiateTransfer,
    onSuccess: () => {
      toast.success("Transfer sent.")
      queryClient.invalidateQueries({ queryKey: ["/wallet"] })
      queryClient.invalidateQueries({ queryKey: ["/wallet/recipients"] })
      queryClient.invalidateQueries({ queryKey: ["/transactions"] })
      queryClient.invalidateQueries({ queryKey: ["/transactions/metrics"] })
      void useWalletStore.getState().fetchWallet()
      close()
    },
    onError: (error) =>
      toast.error(
        constructErrorMessage(
          error as TApiErrorResponseType,
          "Couldn't send your transfer.",
        ),
      ),
  })

  const canLookup =
    bankCode.length > 0 &&
    /^\d{10}$/.test(accountNumber) &&
    !lookupMutation.isPending &&
    !verified
  const kobo = nairaToKoboOrNull(naira)
  const canSubmit =
    verified !== null &&
    kobo !== null &&
    kobo >= 100 &&
    !transferMutation.isPending

  const handleSubmit = () => {
    if (!verified || kobo === null) return
    transferMutation.mutate({
      bankCode,
      accountNumber,
      accountName: verified.accountName,
      amount: kobo,
      remark: remark.trim() || undefined,
      category: category || undefined,
    })
  }

  return (
    <SheetShell
      mode="send"
      footer={
        <Button
          size="lg"
          className="h-11 w-full gap-2 rounded-full shadow-primary"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          {transferMutation.isPending ? <Spinner /> : <ArrowRight />}
          {transferMutation.isPending ? "Sending" : "Send transfer"}
        </Button>
      }
    >
      <Field label="Bank">
        <BankCombobox
          value={bankCode}
          onChange={setBankCode}
          container={sheetContainer ?? undefined}
        />
      </Field>

      <Field label="Account number">
        <Input
          inputMode="numeric"
          maxLength={10}
          placeholder="0123456789"
          value={accountNumber}
          onChange={(e) =>
            setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          className="h-11 bg-card"
        />
      </Field>

      {verified ? (
        <div className="rounded-lg border border-good-200 bg-good-50 px-3 py-2 text-sm font-medium text-good-700 dark:border-good-500/30 dark:bg-good-500/10 dark:text-good-300">
          {verified.accountName}
        </div>
      ) : (
        <Button
          variant="outline"
          size="lg"
          className="h-10 gap-2 rounded-full"
          disabled={!canLookup}
          onClick={() =>
            lookupMutation.mutate({ bankCode, accountNumber })
          }
        >
          {lookupMutation.isPending && <Loader2 className="size-4 animate-spin" />}
          {lookupMutation.isPending ? "Verifying" : "Verify account"}
        </Button>
      )}

      <NairaAmountInput value={naira} onChange={setNaira} />

      <Field label="Remark (optional)">
        <Input
          placeholder="Lunch money"
          maxLength={120}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="h-11 bg-card"
        />
      </Field>

      <Field label="Category (optional)">
        <CategoryCombobox
          value={category}
          onChange={setCategory}
          container={sheetContainer ?? undefined}
        />
      </Field>
    </SheetShell>
  )
}

// ─── REQUEST ───────────────────────────────────────────────────────────────

function RequestSheet() {
  const close = useWalletActionsStore((s) => s.close)
  const queryClient = useQueryClient()

  const [naira, setNaira] = useState("")
  const [description, setDescription] = useState("")
  const [result, setResult] = useState<{
    checkoutUrl: string
    reference: string
  } | null>(null)

  const mutation = useMutation({
    mutationFn: createPaymentRequest,
    onSuccess: (request) => {
      setResult({
        checkoutUrl: request.checkoutUrl,
        reference: request.reference,
      })
      queryClient.invalidateQueries({ queryKey: ["/wallet/payment-requests"] })
    },
    onError: (error) =>
      toast.error(
        constructErrorMessage(
          error as TApiErrorResponseType,
          "Couldn't create that payment request.",
        ),
      ),
  })

  const kobo = nairaToKoboOrNull(naira)
  const disabled = mutation.isPending || kobo === null || kobo < 10_000

  const handleSubmit = () => {
    if (kobo === null) return
    mutation.mutate({
      amount: kobo,
      description: description.trim() || undefined,
    })
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.checkoutUrl)
      toast.success("Link copied.")
    } catch {
      toast.error("Couldn't copy the link.")
    }
  }

  return (
    <SheetShell
      mode="request"
      footer={
        result ? (
          <div className="flex w-full flex-col gap-2">
            <Button
              size="lg"
              className="h-11 w-full gap-2 rounded-full shadow-primary"
              onClick={handleCopy}
            >
              <Copy className="size-4" />
              Copy link
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 w-full gap-2 rounded-full"
              onClick={close}
            >
              Done
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="h-11 w-full gap-2 rounded-full shadow-primary"
            disabled={disabled}
            onClick={handleSubmit}
          >
            {mutation.isPending ? <Spinner /> : <ArrowRight />}
            {mutation.isPending ? "Creating" : "Create link"}
          </Button>
        )
      }
    >
      {result ? (
        <div className="space-y-3">
          <p className="text-sm text-text-2">
            Share this link with anyone you want to collect{" "}
            <span className="font-semibold text-foreground">
              {formatNairaWhole(kobo ?? 0)}
            </span>{" "}
            from.
          </p>
          <div className="break-all rounded-lg border border-border bg-card px-3 py-2 text-xs font-mono text-text-2">
            {result.checkoutUrl}
          </div>
          <p className="text-xs text-text-3">
            Reference: <span className="font-mono">{result.reference}</span>
          </p>
        </div>
      ) : (
        <>
          <NairaAmountInput value={naira} onChange={setNaira} autoFocus />
          <Field label="Description (optional)">
            <Input
              placeholder="October rent contribution"
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-11 bg-card"
            />
          </Field>
        </>
      )}
    </SheetShell>
  )
}

// ─── shared helpers ────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}

function NairaAmountInput({
  value,
  onChange,
  helper,
  autoFocus,
}: {
  value: string
  onChange: (next: string) => void
  helper?: string
  autoFocus?: boolean
}) {
  const previewKobo = nairaToKoboOrNull(value)
  return (
    <Field label="Amount">
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-text-3">
          ₦
        </span>
        <Input
          inputMode="decimal"
          placeholder="0.00"
          value={value}
          onChange={(e) =>
            onChange(e.target.value.replace(/[^\d.]/g, "").slice(0, 12))
          }
          autoFocus={autoFocus}
          className="h-11 bg-card pl-7 text-base tabular-nums"
        />
      </div>
      {previewKobo !== null && previewKobo > 0 ? (
        <p className="text-xs text-text-3">
          You&rsquo;ll send {formatNairaWhole(previewKobo)}
        </p>
      ) : helper ? (
        <p className="text-xs text-text-3">{helper}</p>
      ) : null}
    </Field>
  )
}

// Parses a user-entered naira string into kobo. Returns null when the value
// isn't a positive number — used to drive the disabled state on submit.
function nairaToKoboOrNull(raw: string): number | null {
  if (!raw) return null
  const n = Number(raw)
  if (!Number.isFinite(n) || n <= 0) return null
  return nairaToKobo(n)
}

