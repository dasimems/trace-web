"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  simulateOpportunity,
  type TOpportunity,
} from "@/api/opportunities"
import { OpportunitySource } from "@/lib/enum"
import { formatNaira, formatNairaWhole } from "@/lib/money"

const TENOR_DAYS = [30, 60, 90, 180, 365] as const

type Props = {
  opportunity: TOpportunity
}

export function OpportunitySimulator({ opportunity }: Props) {
  const initialAmount = parseInitialAmount(opportunity)
  const initialTenor = parseInitialTenor(opportunity)

  const [amount, setAmount] = useState<number>(initialAmount)
  const [tenorDays, setTenorDays] = useState<number>(initialTenor)

  useEffect(() => {
    setAmount(initialAmount)
    setTenorDays(initialTenor)
  }, [initialAmount, initialTenor])

  const key = `/opportunities/${opportunity.source}/${opportunity.id}/simulate?amount=${amount}&tenorDays=${tenorDays}`
  const { data, isLoading, error } = useEndpoint(key, () =>
    simulateOpportunity(opportunity.source, opportunity.id, amount, tenorDays),
  )

  const minAmount = 10_000_00
  const maxAmount = 5_000_000_00
  const fillPercent = Math.min(
    100,
    Math.max(0, ((amount - minAmount) / (maxAmount - minAmount)) * 100),
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        <h3 className="font-display text-base font-semibold text-foreground">
          {opportunity.source === OpportunitySource.LOAN
            ? "Repayment simulator"
            : opportunity.source === OpportunitySource.INVESTMENT
            ? "Yield simulator"
            : "Eligibility simulator"}
        </h3>
        {isLoading && <Spinner className="size-3 text-text-3" />}
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Live · drag to adjust
        </Badge>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <div className="text-sm text-text-3">Amount</div>
          <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
            {formatNairaWhole(amount)}
          </div>
          <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.span
              animate={{ width: `${fillPercent}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="block h-full rounded-full bg-lime-500"
            />
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={10_000_00}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
              aria-label="Amount"
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[11px] text-text-3">
            <span>{formatNairaWhole(minAmount)}</span>
            <span>{formatNairaWhole(maxAmount)}</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-text-3">Tenor</div>
          <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
            {tenorDays} days
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {TENOR_DAYS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTenorDays(t)}
                className={cn(
                  "inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium transition-colors",
                  tenorDays === t
                    ? "border-lime-500 bg-lime-50 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"
                    : "border-border bg-card text-text-2 hover:border-neutral-300 hover:text-foreground dark:hover:border-neutral-700",
                )}
              >
                {t} d
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        {data ? (
          <SimStats opportunity={opportunity} sim={data} />
        ) : isLoading ? (
          <SimSkeleton />
        ) : (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    </div>
  )
}

function SimStats({
  opportunity,
  sim,
}: {
  opportunity: TOpportunity
  sim: Awaited<ReturnType<typeof simulateOpportunity>>
}) {
  if (opportunity.source === OpportunitySource.LOAN) {
    return (
      <>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SimStat
            label="Daily debit"
            value={sim.dailyPayment ? formatNaira(sim.dailyPayment) : "—"}
            caption="Auto-debited"
          />
          <SimStat
            label="Weekly equiv."
            value={sim.weeklyPayment ? formatNaira(sim.weeklyPayment) : "—"}
            caption="6 days × debit"
          />
          <SimStat
            label="Total cost"
            value={
              sim.totalRepayment ? formatNaira(sim.totalRepayment) : "—"
            }
            caption={
              sim.totalInterest
                ? `+${formatNaira(sim.totalInterest)} interest`
                : ""
            }
          />
          <SimStat
            label="Affordable?"
            value={sim.isAffordable ? "Yes" : "Tight"}
            caption={
              sim.isAffordable
                ? "Sits inside your buffer"
                : "Consider smaller or longer"
            }
          />
        </div>
      </>
    )
  }
  if (opportunity.source === OpportunitySource.INVESTMENT) {
    const returnPct = sim.projectedReturnBps
      ? (sim.projectedReturnBps / 100).toFixed(1)
      : null
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SimStat
          label="Projected value"
          value={sim.projectedValue ? formatNaira(sim.projectedValue) : "—"}
          caption="At maturity"
        />
        <SimStat
          label="Projected return"
          value={returnPct ? `${returnPct}%` : "—"}
          caption="Annualised"
        />
        <SimStat
          label="Tenor"
          value={`${sim.inputTenorDays} d`}
          caption="From settlement"
        />
      </div>
    )
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SimStat
        label="Eligibility score"
        value={
          sim.eligibilityScore !== undefined
            ? `${sim.eligibilityScore}%`
            : "—"
        }
        caption="Based on your profile"
      />
      <SimStat
        label="Amount"
        value={formatNaira(sim.inputAmount)}
        caption="Tested"
      />
      <SimStat
        label="Window"
        value={`${sim.inputTenorDays} d`}
        caption="From application"
      />
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

function SimSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-2 h-6 w-24" />
          <Skeleton className="mt-2 h-3 w-32" />
        </div>
      ))}
    </div>
  )
}

function parseNairaCompact(value: string | undefined): number | null {
  if (!value) return null
  const match = value.replace(/[, ]/g, "").match(/(\d+(?:\.\d+)?)([kmM]?)/)
  if (!match) return null
  const base = parseFloat(match[1])
  const mult =
    match[2] === "m" || match[2] === "M" ? 1_000_000 : match[2] === "k" ? 1_000 : 1
  return Math.round(base * mult * 100)
}

function parseInitialAmount(opp: TOpportunity): number {
  const fromMin = parseNairaCompact(opp.stats.min)
  if (fromMin && fromMin > 0) return Math.max(fromMin, 100_000_00)
  return 200_000_00
}

function parseInitialTenor(opp: TOpportunity): number {
  if (!opp.stats.tenor) return 90
  const match = opp.stats.tenor.match(/(\d+)\s*(d|day|days|mo|month|months)?/i)
  if (!match) return 90
  const value = parseInt(match[1], 10)
  const unit = (match[2] ?? "").toLowerCase()
  if (unit.startsWith("mo")) return value * 30
  return value
}
