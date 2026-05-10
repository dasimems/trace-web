"use client"

import { motion } from "motion/react"
import { Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Tone = "lime" | "info" | "good"

type SubBalance = {
  label: string
  caption: string
  amount: string
  percent: number
  meta: string
  tone: Tone
}

const SUB_BALANCES: ReadonlyArray<SubBalance> = [
  {
    label: "Spend",
    caption: "Day-to-day money",
    amount: "₦318,420",
    percent: 65,
    meta: "Auto-tag every txn",
    tone: "lime",
  },
  {
    label: "Save",
    caption: "13.2% p.a. · withdraw anytime",
    amount: "₦128,790",
    percent: 26,
    meta: "+₦25k auto-rule on payday",
    tone: "info",
  },
  {
    label: "Goals · Lagos store",
    caption: "Target ₦500k · Aug 2026",
    amount: "₦40,000",
    percent: 9,
    meta: "8% complete · ETA on track",
    tone: "good",
  },
]

const DOT: Record<Tone, string> = {
  lime: "bg-lime-500",
  info: "bg-info-500",
  good: "bg-good-500",
}

const FILL: Record<Tone, string> = {
  lime: "bg-lime-500",
  info: "bg-info-500",
  good: "bg-good-500",
}

export function WalletSubBalances() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-base font-semibold text-foreground">
            Sub-balances
          </h3>
          <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
            3 of 3 used
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full px-3 text-xs">
          <Plus />
          New goal
        </Button>
      </div>

      <ul className="mt-4 space-y-4">
        {SUB_BALANCES.map((entry) => (
          <li
            key={entry.label}
            className="rounded-xl border border-border bg-background/30 p-3.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className={cn("size-2 rounded-full", DOT[entry.tone])} />
                  {entry.label}
                </div>
                <div className="mt-0.5 truncate text-xs text-text-3">
                  {entry.caption}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-sm font-semibold tabular-nums text-foreground">
                  {entry.amount}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-text-3">
                  {entry.percent}%
                </div>
              </div>
            </div>

            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${entry.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn("block h-full rounded-full", FILL[entry.tone])}
              />
            </div>

            <div className="mt-2 text-xs text-text-3">{entry.meta}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
