"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Tenor = 3 | 6 | 9 | 12
const TENORS: ReadonlyArray<Tenor> = [3, 6, 9, 12]

const MIN_AMOUNT = 100_000
const MAX_AMOUNT = 1_800_000
const APR = 0.145

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`
}

export function OpportunitySimulator() {
  const [amount, setAmount] = useState(1_200_000)
  const [tenor, setTenor] = useState<Tenor>(6)

  const totals = useMemo(() => {
    const totalCost = Math.round(amount * (1 + APR * (tenor / 12)))
    const days = tenor * 26
    const daily = Math.round(totalCost / days)
    const weekly = Math.round(daily * 7)
    return { totalCost, daily, weekly }
  }, [amount, tenor])

  const fillPercent = ((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        <h3 className="font-display text-base font-semibold text-foreground">
          Repayment simulator
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Live · drag to adjust
        </Badge>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <div className="text-sm text-text-3">Amount</div>
          <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
            {formatNaira(amount)}
          </div>
          <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.span
              animate={{ width: `${fillPercent}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="block h-full rounded-full bg-lime-500"
            />
            <input
              type="range"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={50_000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
              aria-label="Loan amount"
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[11px] text-text-3">
            <span>₦100k</span>
            <span>₦1.8M (your tier max)</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-text-3">Tenor</div>
          <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
            {tenor} months
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {TENORS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTenor(t)}
                className={cn(
                  "inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium transition-colors",
                  tenor === t
                    ? "border-lime-500 bg-lime-50 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"
                    : "border-border bg-card text-text-2 hover:border-neutral-300 hover:text-foreground dark:hover:border-neutral-700",
                )}
              >
                {t} m
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SimStat
          label="Daily debit"
          value={formatNaira(totals.daily)}
          caption="Mon–Sat · auto"
        />
        <SimStat
          label="Weekly equiv."
          value={formatNaira(totals.weekly)}
          caption="6 days × debit"
        />
        <SimStat
          label="Total cost"
          value={formatNaira(totals.totalCost)}
          caption="incl. fees"
        />
        <SimStat
          label="Effective APR"
          value={`${(APR * 100).toFixed(1)}%`}
          caption="no hidden charges"
        />
      </div>

      <div className="mt-5 flex">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-3 py-1 font-mono text-[11px] tracking-wide text-white">
          <span className="size-1.5 rounded-full bg-lime-500" />
          Repayment fits your weekly cash-flow with a 24% buffer
        </span>
      </div>
    </div>
  )
}

function SimStat({
  label,
  value,
  caption,
}: {
  label: string
  value: string
  caption: string
}) {
  return (
    <div>
      <div className="text-xs text-text-3">{label}</div>
      <div className="mt-1 font-display text-xl font-semibold tabular-nums tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[11px] text-text-3">{caption}</div>
    </div>
  )
}
