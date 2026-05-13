"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type ReasonRow = {
  label: string
  percent: number
}

const REASONS: ReadonlyArray<ReasonRow> = [
  { label: "Cash-flow alignment",   percent: 96 },
  { label: "Tier · Gold",           percent: 88 },
  { label: "Sector · textiles",     percent: 92 },
  { label: "Repayment cadence fit", percent: 84 },
]

export function TopMatchFeature() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-3xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5 sm:p-7"
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
        <div>
          <span className="ai-badge">Top match · 96%</span>

          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
            SquadCapital Working Capital · ₦1.8M
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-2">
           Copilot ranked this #1 because your Squad transaction history shows 9 consecutive weeks of stable cashflow — exactly what SquadCapital's underwriting model {" "}
            <span className="font-semibold text-lime-600 dark:text-lime-400">
              rewards.
            </span>
            No collateral. No paperwork.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <Stat label="Limit" value="₦1.8M" />
            <Stat label="APR" value="14.5%" />
            <Stat label="Tenor" value="6 months" />
            <Stat
              label="Approval confidence"
              value="92%"
              valueClass="text-lime-600 dark:text-lime-400"
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-10 rounded-full px-5 shadow-primary">
              <Link href="/app/opportunities/squadcapital-working-capital">
                Apply in 4 minutes <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-10 rounded-full px-5">
              Simulate repayment
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm">
          <div className="text-sm font-medium text-foreground">
            Why Copilot picked this
          </div>
          <ul className="mt-4 space-y-4">
            {REASONS.map((reason) => (
              <li key={reason.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-2">{reason.label}</span>
                  <span className="font-display tabular-nums text-lime-600 dark:text-lime-400">
                    {reason.percent}%
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${reason.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="block h-full rounded-full bg-lime-500"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function Stat({
  label,
  value,
  valueClass,
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div>
      <div className="text-xs text-text-3">{label}</div>
      <div
        className={`mt-1 font-display text-xl font-semibold tabular-nums tracking-tight text-foreground ${valueClass ?? ""}`}
      >
        {value}
      </div>
    </div>
  )
}
