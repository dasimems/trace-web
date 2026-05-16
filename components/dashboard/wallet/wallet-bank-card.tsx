"use client"

import { motion } from "motion/react"
import { Copy, Share2 } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

import { LogoMark } from "@/components/landing/logo-mark"
import { Skeleton } from "@/components/ui/skeleton"
import useUserStore from "@/stores/user-store"

function splitAccountNumber(raw: string): { head: string; tail: string } {
  const digits = raw.replace(/\D/g, "").padEnd(10, "0").slice(0, 10)
  const grouped = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`
  return { head: grouped.slice(0, -1), tail: grouped.slice(-1) }
}

function maskBvn(bvn?: string): string {
  if (!bvn || bvn.length < 4) return "—"
  return `${bvn.slice(0, 4)} ··· ··${bvn.slice(-2)}`
}

export function WalletBankCard() {
  const account = useUserStore((s) => s.userDetails?.bankAccounts?.[0])
  const bvn = useUserStore((s) => s.userDetails?.bvn)

  async function handleCopy() {
    if (!account) return
    try {
      await navigator.clipboard.writeText(account.accountNumber)
      toast.success("Account number copied")
    } catch {
      toast.error("Couldn't copy account number")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-neutral-950 p-5 text-white shadow-[0_30px_60px_-20px_rgba(15,17,15,0.55)] sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-12 h-60 w-60 rounded-full bg-lime-500/45 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_30%,rgba(224,24,91,0.2),transparent_55%)]"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <LogoMark className="size-9" />
          <div>
            <div className="font-display text-base font-semibold tracking-tight">
              Trace bank
            </div>
            <div className="mt-0.5 font-mono text-[11px] tracking-wider text-neutral-400">
              Powered by Squad / GTCO · {account?.bankCode ?? "058"}
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-good-500/15 px-3 py-1 font-mono text-[11px] tracking-wide text-good-300 ring-1 ring-good-500/30">
          <span className="size-1.5 rounded-full bg-good-400" />
          Active
        </span>
      </div>

      <div className="relative mt-9">
        <div className="font-mono text-[11px] tracking-[0.16em] text-neutral-400">
          ACCOUNT NUMBER
        </div>
        {account ? (
          <AccountNumber raw={account.accountNumber} />
        ) : (
          <Skeleton className="mt-2 h-12 w-3/4 bg-white/10" />
        )}
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-4 font-mono text-[11px] tracking-[0.16em] sm:mt-8 sm:grid-cols-3">
        <Datum
          label="ACCOUNT NAME"
          value={account?.accountName?.toUpperCase()}
        />
        <Datum
          label="OPENED"
          value={
            account?.createdAt
              ? format(new Date(account.createdAt), "dd MMM yyyy")
              : undefined
          }
        />
        <Datum label="BVN" value={maskBvn(bvn)} />
      </div>

      <div className="relative mt-6 flex justify-end gap-2">
        <CardActionButton
          icon={<Copy className="size-3.5" />}
          label="Copy"
          onClick={handleCopy}
          disabled={!account}
        />
        <CardActionButton
          icon={<Share2 className="size-3.5" />}
          label="Share"
          disabled
        />
      </div>
    </motion.div>
  )
}

function AccountNumber({ raw }: { raw: string }) {
  const { head, tail } = splitAccountNumber(raw)
  return (
    <div className="mt-2 font-display text-4xl font-semibold tabular-nums leading-none tracking-[0.08em] text-white sm:text-[56px]">
      {head}
      <span className="text-lime-500">{tail}</span>
    </div>
  )
}

function Datum({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-neutral-500">{label}</div>
      {value ? (
        <div className="mt-1 text-sm tracking-wider text-neutral-100">
          {value}
        </div>
      ) : (
        <Skeleton className="mt-1 h-4 w-24 bg-white/10" />
      )}
    </div>
  )
}

function CardActionButton({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-xs font-medium text-white transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {icon}
      {label}
    </button>
  )
}
