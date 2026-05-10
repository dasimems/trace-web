"use client"

import { motion } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Plus,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Action = {
  label: string
  icon: LucideIcon
  iconClassName?: string
  primary?: boolean
}

const ACTIONS: ReadonlyArray<Action> = [
  { label: "Fund",        icon: Plus,       primary: true                                 },
  { label: "Send",        icon: ArrowRight                                                },
  { label: "Request",     icon: ArrowLeft                                                 },
  { label: "Pay bill",    icon: Zap,        iconClassName: "text-warn-500 fill-warn-500" },
  { label: "Buy airtime", icon: Smartphone                                                },
]

export function AvailableBalanceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
      className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm text-text-3">Available balance</div>
        <Badge variant="good" className="h-6 px-2.5 text-xs">
          +₦82,300 today
        </Badge>
      </div>

      <div className="mt-3 flex items-baseline">
        <span className="font-display text-[56px] font-semibold tabular-nums leading-none tracking-tight text-foreground">
          ₦487,210
        </span>
        <span className="font-display text-2xl font-semibold tabular-nums text-text-3">
          .40
        </span>
      </div>
      <div className="mt-2 text-sm text-text-3">
        Ledger ₦487,210.40 · Pending ₦0.00
      </div>

      <BalanceSparkline className="mt-3" />

      <div className="mt-4 flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <ActionPill key={action.label} action={action} />
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
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

function ActionPill({ action }: { action: Action }) {
  const Icon = action.icon
  if (action.primary) {
    return (
      <Button size="lg" className="h-9 gap-1.5 rounded-full px-3.5 shadow-primary">
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
