"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type RiskTone = "good" | "lime" | "warn" | "info" | "bad"

type RiskRow = {
  label: string
  score: number
  tone: RiskTone
}

const ROWS: ReadonlyArray<RiskRow> = [
  { label: "Income consistency",  score: 92, tone: "good" },
  { label: "Repayment behaviour", score: 88, tone: "lime" },
  { label: "Spending discipline", score: 64, tone: "warn" },
  { label: "Buffer reserves",     score: 71, tone: "info" },
  { label: "Diversified income",  score: 48, tone: "bad"  },
]

const FILL: Record<RiskTone, string> = {
  good: "bg-good-500",
  lime: "bg-lime-500",
  warn: "bg-warn-500",
  info: "bg-info-500",
  bad:  "bg-bad-500",
}

const SCORE_TEXT: Record<RiskTone, string> = {
  good: "text-good-600 dark:text-good-400",
  lime: "text-lime-600 dark:text-lime-400",
  warn: "text-warn-600 dark:text-warn-400",
  info: "text-info-600 dark:text-info-400",
  bad:  "text-bad-600 dark:text-bad-400",
}

export function RiskStabilityCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Risk &amp; stability
      </h3>

      <ul className="mt-4 space-y-3.5">
        {ROWS.map((row) => (
          <li key={row.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-2">{row.label}</span>
              <span
                className={cn(
                  "font-display tabular-nums",
                  SCORE_TEXT[row.tone],
                )}
              >
                {row.score}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${row.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn("block h-full rounded-full", FILL[row.tone])}
              />
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-full bg-neutral-950 px-3.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Diversify income to push to 90+
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  )
}
