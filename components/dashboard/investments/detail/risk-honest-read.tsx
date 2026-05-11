"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type RiskTone = "warn" | "info" | "purple" | "good"

type RiskRow = {
  label: string
  valueText: string
  tone: RiskTone
  fillPercent: number
}

const ROWS: ReadonlyArray<RiskRow> = [
  { label: "Drawdown (worst-12mo)", valueText: "-6.8%",          tone: "warn",   fillPercent: 35 },
  { label: "Liquidity",             valueText: "90-day lock-up", tone: "info",   fillPercent: 55 },
  { label: "Concentration",         valueText: "Sector-specific", tone: "purple", fillPercent: 70 },
  { label: "Regulatory",            valueText: "SEC-registered",  tone: "good",   fillPercent: 95 },
]

const FILL: Record<RiskTone, string> = {
  warn:   "bg-warn-500",
  info:   "bg-info-500",
  purple: "bg-purple-500",
  good:   "bg-good-500",
}

const VALUE_TEXT: Record<RiskTone, string> = {
  warn:   "text-warn-600 dark:text-warn-400",
  info:   "text-info-600 dark:text-info-400",
  purple: "text-purple-600 dark:text-purple-400",
  good:   "text-good-600 dark:text-good-400",
}

export function RiskHonestRead() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Risk · honest read
      </h3>

      <ul className="mt-4 space-y-4">
        {ROWS.map((row) => (
          <li key={row.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-2">{row.label}</span>
              <span
                className={cn(
                  "font-mono text-xs tracking-wide",
                  VALUE_TEXT[row.tone],
                )}
              >
                {row.valueText}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${row.fillPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn("block h-full rounded-full", FILL[row.tone])}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-text-3">
        Past performance is not a guarantee. Trace shows worst-case scenarios
        alongside expected ones.
      </p>
    </div>
  )
}
