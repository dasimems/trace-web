"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type SubBalanceTone = "lime" | "info" | "good"

type SubBalance = {
  label: string
  amount: string
  tone: SubBalanceTone
  fillPercent: number
}

const SUB_BALANCES: ReadonlyArray<SubBalance> = [
  { label: "Spend",                amount: "₦318,420", tone: "lime", fillPercent: 88 },
  { label: "Save",                 amount: "₦128,790", tone: "info", fillPercent: 60 },
  { label: "Goals · Lagos store",  amount: "₦40,000",  tone: "good", fillPercent: 22 },
]

const DOT_CLASSES: Record<SubBalanceTone, string> = {
  lime: "bg-lime-500",
  info: "bg-info-500",
  good: "bg-good-500",
}

const BAR_CLASSES: Record<SubBalanceTone, string> = {
  lime: "bg-lime-500",
  info: "bg-info-500",
  good: "bg-good-500",
}

export function SubBalancesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
      className="col-span-12 rounded-2xl border border-border bg-card p-6 shadow-card sm:col-span-6 xl:col-span-3"
    >
      <div className="text-sm text-text-3">Sub-balances</div>
      <ul className="mt-4 space-y-4">
        {SUB_BALANCES.map((entry) => (
          <li key={entry.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <span className={cn("size-2 rounded-full", DOT_CLASSES[entry.tone])} />
                {entry.label}
              </span>
              <span className="font-display tabular-nums text-foreground">
                {entry.amount}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${entry.fillPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn("block h-full rounded-full", BAR_CLASSES[entry.tone])}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
