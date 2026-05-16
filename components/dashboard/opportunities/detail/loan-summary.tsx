"use client"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  getOpportunityCostBreakdown,
  getOpportunityPersonalized,
  type TOpportunity,
} from "@/api/opportunities"
import { formatNaira, formatNairaCompact } from "@/lib/money"

type Props = {
  opportunity: TOpportunity
}

export function EstimatedForYouCard({ opportunity }: Props) {
  const { data, isLoading, error } = useEndpoint(
    `/opportunities/${opportunity.source}/${opportunity.id}/personalized`,
    () => getOpportunityPersonalized(opportunity.source, opportunity.id),
  )

  const rows: Array<{ label: string; value: string }> = []
  if (data) {
    if (data.estimatedNetReceived !== undefined) {
      rows.push({
        label: "You receive",
        value: formatNaira(data.estimatedNetReceived),
      })
    }
    if (data.estimatedMonthlyCost !== undefined) {
      rows.push({
        label: "Monthly cost",
        value: formatNaira(data.estimatedMonthlyCost),
      })
    }
    if (data.weeklyBufferPercent !== undefined) {
      rows.push({
        label: "Weekly buffer",
        value: `${data.weeklyBufferPercent}%`,
      })
    }
  }

  if (opportunity.stats.return) {
    rows.push({ label: "Return / cost", value: opportunity.stats.return })
  }
  if (opportunity.stats.tenor) {
    rows.push({ label: "Tenor", value: opportunity.stats.tenor })
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Estimated for you
        </h3>
        {data && (
          <Badge variant="good" className="h-6 px-2.5 text-[11px]">
            {data.approvalConfidencePercent}% approval
          </Badge>
        )}
      </div>

      {data ? (
        <>
          <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs text-text-3">{row.label}</dt>
                <dd className="mt-1 font-display text-base font-semibold tabular-nums tracking-tight text-foreground">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-text-2">
            {data.oneLiner}
          </p>
        </>
      ) : isLoading ? (
        <EstimatedSkeleton />
      ) : (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

function EstimatedSkeleton() {
  return (
    <>
      <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="mt-2 h-5 w-24" />
          </div>
        ))}
      </dl>
      <Skeleton className="mt-4 h-4 w-3/4" />
    </>
  )
}

const CYCLE_LABEL: Record<string, string> = {
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  DAILY: "daily",
}

export function CostBreakdownCard({ opportunity }: Props) {
  const { data, isLoading, error } = useEndpoint(
    `/opportunities/${opportunity.source}/${opportunity.id}/cost-breakdown`,
    () => getOpportunityCostBreakdown(opportunity.source, opportunity.id),
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Total cost breakdown
      </h3>

      {data ? (
        <>
          <ul className="mt-4 space-y-2.5">
            {data.items.map((line) => (
              <li
                key={line.label}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="text-text-2">
                  {line.label}
                  {line.recurring && (
                    <span className="ml-1 text-xs text-text-3">
                      ({CYCLE_LABEL[data.cycle ?? "MONTHLY"]})
                    </span>
                  )}
                </span>
                <span className="font-display tabular-nums text-foreground">
                  {formatNaira(line.amount)}
                </span>
              </li>
            ))}
          </ul>

          {(data.totalUpfront > 0 || data.totalRecurring > 0) && (
            <div className="mt-4 space-y-1 border-t border-border pt-4">
              {data.totalUpfront > 0 && (
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-base font-semibold text-foreground">
                    Upfront
                  </span>
                  <span className="font-display text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                    {formatNairaCompact(data.totalUpfront)}
                  </span>
                </div>
              )}
              {data.totalRecurring > 0 && (
                <div className="flex items-baseline justify-between text-sm text-text-2">
                  <span>
                    Recurring ·{" "}
                    {CYCLE_LABEL[data.cycle ?? "MONTHLY"]}
                  </span>
                  <span className="font-display tabular-nums text-foreground">
                    {formatNaira(data.totalRecurring)}
                  </span>
                </div>
              )}
            </div>
          )}

          <p className="mt-3 text-xs text-text-3">
            Trace shows total cost first — never just the monthly figure.
          </p>
        </>
      ) : isLoading ? (
        <BreakdownSkeleton />
      ) : (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

function BreakdownSkeleton() {
  return (
    <ul className="mt-4 space-y-2.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex items-baseline justify-between gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </li>
      ))}
    </ul>
  )
}
