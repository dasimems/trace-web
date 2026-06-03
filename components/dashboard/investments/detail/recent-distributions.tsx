"use client"

import { useMemo } from "react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getDistributions } from "@/api/investments"
import { formatPrice, formatPriceCompact } from "@/lib/money"

const TYPE_LABEL: Record<string, string> = {
  DIVIDEND: "Dividend",
  INTEREST: "Interest",
  CAPITAL_GAIN: "Capital gain",
}

const TYPE_TONE: Record<string, "good" | "lime" | "info"> = {
  DIVIDEND: "good",
  INTEREST: "lime",
  CAPITAL_GAIN: "info",
}

export function RecentDistributions({ productId }: { productId: string }) {
  const { data, isLoading, error } = useEndpoint(
    productId ? `/investments/products/${productId}/distributions` : null,
    () => getDistributions(productId, 6),
  )

  const distributions = data?.distributions ?? []
  const aggregatePaid = useMemo(
    () => distributions.reduce((acc, d) => acc + d.totalPaid.amount, 0),
    [distributions],
  )
  const aggregateCurrency = distributions[0]?.totalPaid.currency

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Recent distributions
      </h3>

      {distributions.length === 0 ? (
        isLoading ? (
          <DistributionsSkeleton />
        ) : error ? (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-3 text-sm text-text-3">
            No payouts in the last few months.
          </p>
        )
      ) : (
        <ul className="mt-3 divide-y divide-border">
          {distributions.map((d) => (
            <li
              key={d.id}
              className="grid grid-cols-[1fr_auto_auto] items-baseline gap-3 py-3"
            >
              <span className="text-sm text-text-2">
                {format(new Date(d.paidAt), "MMM yyyy")}
              </span>
              <span className="font-display text-sm tabular-nums text-foreground">
                <span className="text-lime-600 dark:text-lime-400">
                  +{formatPrice(d.amountPerUnit)}
                </span>
                <span className="ml-1 text-text-3">/ unit</span>
              </span>
              <Badge
                variant={TYPE_TONE[d.type] ?? "secondary"}
                className="h-5 px-2 text-[11px]"
              >
                {TYPE_LABEL[d.type] ?? d.type}
              </Badge>
            </li>
          ))}
        </ul>
      )}

      {distributions.length > 0 && aggregateCurrency && (
        <p className="mt-3 text-xs text-text-3">
          Aggregate paid:{" "}
          {`${aggregateCurrency.symbol}${new Intl.NumberFormat(aggregateCurrency.locale, { notation: "compact", maximumFractionDigits: 1 }).format(aggregatePaid)}`}{" "}
          across the fund
        </p>
      )}
    </div>
  )
}

function DistributionsSkeleton() {
  return (
    <ul className="mt-3 divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="grid grid-cols-[1fr_auto_auto] gap-3 py-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-14" />
        </li>
      ))}
    </ul>
  )
}
