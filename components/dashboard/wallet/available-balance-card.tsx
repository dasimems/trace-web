"use client"

import { useEffect } from "react"
import { motion } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Plus,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice, splitPriceParts, type TPrice } from "@/lib/money"
import useWalletStore from "@/stores/wallet-store"
import useWalletActionsStore from "@/stores/wallet-actions-store"

type Action = {
  label: string
  icon: LucideIcon
  iconClassName?: string
  primary?: boolean
  onClick?: () => void
  disabled?: boolean
}

export function AvailableBalanceCard() {
  const snapshot = useWalletStore((s) => s.snapshot)
  const isLoading = useWalletStore((s) => s.isLoading)
  const error = useWalletStore((s) => s.fetchError)
  const hasFetched = useWalletStore((s) => s.hasFetched)
  const fetchWallet = useWalletStore((s) => s.fetchWallet)
  const openFund = useWalletActionsStore((s) => s.openFund)
  const openSend = useWalletActionsStore((s) => s.openSend)
  const openRequest = useWalletActionsStore((s) => s.openRequest)

  useEffect(() => {
    if (!hasFetched) fetchWallet()
  }, [hasFetched, fetchWallet])

  const balance = snapshot?.balance
  const todayNet = balance
    ? balance.todayInflow.amount - balance.todayOutflow.amount
    : 0
  const todayCurrency =
    balance?.todayInflow.currency.symbol ?? "₦"
  const todayLabel = balance
    ? `${todayNet >= 0 ? "+" : ""}${todayCurrency}${Math.abs(todayNet).toLocaleString(balance.todayInflow.currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} today`
    : null

  const actions: ReadonlyArray<Action> = [
    { label: "Fund", icon: Plus, primary: true, onClick: openFund },
    { label: "Send", icon: ArrowRight, onClick: () => openSend() },
    { label: "Request", icon: ArrowLeft, onClick: openRequest },
    {
      label: "Pay bill",
      icon: Zap,
      iconClassName: "text-warn-500 fill-warn-500",
      disabled: true,
    },
    { label: "Buy airtime", icon: Smartphone, disabled: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
      className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <div className="text-sm text-text-3">Available balance</div>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Refresh wallet balance"
            title="Refresh wallet balance"
            onClick={() => fetchWallet()}
            disabled={isLoading}
            className="text-text-3 hover:text-foreground"
          >
            <RefreshCw className={isLoading ? "animate-spin" : undefined} />
          </Button>
        </div>
        {todayLabel && (
          <Badge
            variant={todayNet >= 0 ? "good" : "warn"}
            className="h-6 px-2.5 text-xs"
          >
            {todayLabel}
          </Badge>
        )}
      </div>

      {balance ? (
        <BalanceDisplay
          available={balance.available}
          ledger={balance.ledger}
          pending={balance.pending}
        />
      ) : isLoading ? (
        <BalanceSkeleton />
      ) : error ? (
        <p className="mt-3 text-sm text-destructive">{error}</p>
      ) : (
        <p className="mt-3 text-sm text-text-3">
          We couldn&rsquo;t fetch your wallet yet.
        </p>
      )}

      <BalanceSparkline className="mt-3" />

      <div className="mt-4 flex flex-wrap gap-2">
        {actions.map((action) => (
          <ActionPill key={action.label} action={action} />
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        disabled
        title="Cards aren't available yet"
        className="mt-2 h-9 w-fit gap-1.5 rounded-full px-3.5"
      >
        <CreditCard /> Cards
      </Button>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-text-3">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5" />
          CBN-licensed · Squad / GTCO
        </span>
        <span>Daily limit · ₦1,000,000</span>
      </div>
    </motion.div>
  )
}

function BalanceDisplay({
  available,
  ledger,
  pending,
}: {
  available: TPrice
  ledger: TPrice
  pending: TPrice
}) {
  const parts = splitPriceParts(available)
  return (
    <>
      <div className="mt-3 flex items-baseline">
        <span className="font-display text-[56px] font-semibold tabular-nums leading-none tracking-tight text-foreground">
          {parts.whole}
        </span>
        <span className="font-display text-2xl font-semibold tabular-nums text-text-3">
          {parts.decimal}
        </span>
      </div>
      <div className="mt-2 text-sm text-text-3">
        Ledger {formatPrice(ledger)} · Pending {formatPrice(pending)}
      </div>
    </>
  )
}

function BalanceSkeleton() {
  return (
    <>
      <Skeleton className="mt-3 h-14 w-64" />
      <Skeleton className="mt-2 h-4 w-56" />
    </>
  )
}

function ActionPill({ action }: { action: Action }) {
  const Icon = action.icon
  if (action.primary) {
    return (
      <Button
        size="lg"
        className="h-9 gap-1.5 rounded-full px-3.5 shadow-primary"
        onClick={action.onClick}
        disabled={action.disabled}
      >
        <Icon />
        {action.label}
      </Button>
    )
  }
  return (
    <Button
      variant="outline"
      size="lg"
      className="h-9 gap-1.5 rounded-full px-3.5"
      onClick={action.onClick}
      disabled={action.disabled}
    >
      <Icon className={action.iconClassName} />
      {action.label}
    </Button>
  )
}

function BalanceSparkline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 60"
      className={`h-14 w-full ${className ?? ""}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="balance-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-lime-500)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--color-lime-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 46 L24 42 L48 44 L72 38 L96 36 L120 30 L148 28 L172 22 L196 18 L220 14 L248 10 L280 6 L280 60 L0 60 Z"
        fill="url(#balance-fill)"
      />
      <motion.path
        d="M0 46 L24 42 L48 44 L72 38 L96 36 L120 30 L148 28 L172 22 L196 18 L220 14 L248 10 L280 6"
        fill="none"
        stroke="var(--color-lime-500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  )
}
