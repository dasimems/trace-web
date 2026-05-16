"use client"

import { motion } from "motion/react"
import { Eye, Plus, Settings2, Snowflake, Sun } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  createVirtualCard,
  freezeVirtualCard,
  getVirtualCards,
  type TVirtualCard,
} from "@/api/wallet"
import { constructErrorMessage } from "@/api/functions"
import useUserStore from "@/stores/user-store"

function pickCard(cards: TVirtualCard[]): TVirtualCard | null {
  const active = cards.find((c) => c.status === "ACTIVE")
  if (active) return active
  const frozen = cards.find((c) => c.status === "FROZEN")
  return frozen ?? cards[0] ?? null
}

function formatExp(month: number, year: number): string {
  return `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`
}

export function VirtualCardPreview() {
  const accountName = useUserStore(
    (s) => s.userDetails?.bankAccounts?.[0]?.accountName
  )
  const queryClient = useQueryClient()
  const { data, isLoading, error, refetch } = useEndpoint(
    "/wallet/cards",
    getVirtualCards
  )
  const cards = data ?? []
  const card = pickCard(cards)

  const createMutation = useMutation({
    mutationFn: createVirtualCard,
    onSuccess: () => {
      toast.success("Virtual card created.")
      queryClient.invalidateQueries({ queryKey: ["/wallet/cards"] })
    },
    onError: (e) => {
      toast.error(
        constructErrorMessage(
          e as TApiErrorResponseType,
          "Couldn't create a card."
        )
      )
    },
  })

  const freezeMutation = useMutation({
    mutationFn: (id: string) => freezeVirtualCard(id),
    onSuccess: () => {
      toast.success("Card freeze state toggled.")
      refetch()
    },
    onError: (e) => {
      toast.error(
        constructErrorMessage(
          e as TApiErrorResponseType,
          "Couldn't update the card."
        )
      )
    },
  })

  if (isLoading && !data) return <CardSkeleton />

  if (!card) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-foreground">
            Cards
          </h3>
        </div>
        {/* {error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-4 text-sm text-text-3">
            You don&apos;t have a virtual card yet.
          </p>
        )}
        <Button
          size="lg"
          disabled={createMutation.isPending}
          onClick={() => createMutation.mutate()}
          className="mt-4 h-9 gap-1.5 rounded-full px-3.5 shadow-primary"
        >
          {createMutation.isPending ? <Spinner /> : <Plus />}
          {createMutation.isPending ? "Creating" : "Create card"}
        </Button> */}
        <div className="flex h-full w-full flex-row items-center justify-center gap-1 pb-10">
          <p className="text-sm text-text-3">Coming soon</p>
        </div>
      </div>
    )
  }

  const isFrozen = card.status === "FROZEN"

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">
          Cards
        </h3>
        <Button
          variant="outline"
          size="sm"
          disabled={createMutation.isPending}
          onClick={() => createMutation.mutate()}
          className="h-8 gap-1 rounded-full px-3 text-xs"
        >
          {createMutation.isPending ? <Spinner /> : <Plus />}
          New card
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mt-4 overflow-hidden rounded-2xl bg-neutral-950 p-5 text-white shadow-[0_20px_40px_-16px_rgba(15,17,15,0.55)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-lime-500/35 blur-3xl"
        />
        <div className="relative flex items-center justify-between font-mono text-[11px] tracking-wider text-neutral-400">
          <span>
            Virtual ·{" "}
            <span className="font-display text-sm font-semibold tracking-tight text-white">
              {card.brand}
            </span>
          </span>
          <span
            className={`inline-flex items-center gap-1.5 ${
              isFrozen ? "text-info-300" : "text-good-300"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                isFrozen ? "bg-info-400" : "bg-good-400"
              }`}
            />
            {isFrozen ? "Frozen" : "Active"}
          </span>
        </div>

        <div className="relative mt-6 font-mono text-lg tracking-[0.18em] text-neutral-100">
          ···· <span className="px-1 text-neutral-500">····</span> ····{" "}
          <span className="px-1 text-neutral-500">····</span> {card.last4}
        </div>

        <div className="relative mt-5 flex items-end justify-between font-mono text-[11px] tracking-[0.16em] text-neutral-400">
          <div className="text-sm tracking-wider text-neutral-100">
            {accountName?.toUpperCase() ?? "—"}
          </div>
          <div>EXP {formatExp(card.expMonth, card.expYear)}</div>
        </div>
      </motion.div>

      <div className="mt-4 flex flex-wrap gap-2">
        <CardActionButton
          icon={isFrozen ? Sun : Snowflake}
          label={
            freezeMutation.isPending
              ? "Updating…"
              : isFrozen
                ? "Unfreeze"
                : "Freeze"
          }
          onClick={() => freezeMutation.mutate(card.id)}
          disabled={freezeMutation.isPending}
        />
        <CardActionButton icon={Settings2} label="Limits" disabled />
        <CardActionButton icon={Eye} label="Show CVV" disabled />
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center gap-2 rounded-xl border border-dashed border-border bg-card/60 px-4 py-3 text-sm text-text-2 transition-colors hover:border-lime-300 hover:text-foreground"
      >
        <Plus className="size-4 text-text-3" />
        Order physical Mastercard · ₦1,000
      </button>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="mt-4 h-36 w-full rounded-2xl" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  )
}

function CardActionButton({
  icon: Icon,
  label,
  onClick,
  disabled,
}: {
  icon: LucideIcon
  label: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="h-9 gap-1.5 rounded-full px-3.5"
    >
      <Icon /> {label}
    </Button>
  )
}
