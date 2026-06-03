"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getSafeToInvest } from "@/api/investments"
import { formatPriceCompact, type TPrice } from "@/lib/money"

export function SafeToInvestCard() {
  const { data, isLoading, error } = useEndpoint(
    "/investments/safe-to-invest",
    getSafeToInvest,
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-lime-300 bg-lime-50/40 dark:border-lime-500/40 dark:bg-lime-500/5">
      <div className="bg-neutral-950 px-5 py-3">
        <span className="ai-badge">Safe-to-invest range</span>
      </div>

      <div className="px-5 py-5">
        {data?.status === "ok" ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-semibold tabular-nums leading-none tracking-tight text-foreground">
                {formatPriceCompact(data.suggested)}
              </span>
              <span className="font-display text-3xl font-medium tabular-nums text-text-3 line-through">
                {formatPriceCompact(data.aggressive)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-2">
              {data.rationale}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <BoundCard label="Conservative" value={data.conservative} />
              <BoundCard label="Suggested" value={data.suggested} highlight />
              <BoundCard label="Aggressive" value={data.aggressive} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Button size="lg" className="h-9 rounded-full px-4 shadow-primary">
                Auto-allocate
              </Button>
              <Button variant="outline" size="lg" className="h-9 rounded-full px-4">
                Show options
              </Button>
            </div>
          </>
        ) : data?.status === "insufficient_data" ? (
          <p className="text-sm leading-relaxed text-text-2">
            We need a few more weeks of activity to recommend a safe range.
          </p>
        ) : isLoading ? (
          <>
            <Skeleton className="h-12 w-48" />
            <Skeleton className="mt-3 h-4 w-3/4" />
            <Skeleton className="mt-1 h-4 w-2/3" />
          </>
        ) : (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    </div>
  )
}

function BoundCard({
  label,
  value,
  highlight,
}: {
  label: string
  value: TPrice
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight
          ? "border-lime-400 bg-card"
          : "border-border bg-card/60"
      }`}
    >
      <div className="font-mono text-[10px] tracking-[0.16em] text-text-3">
        {label.toUpperCase()}
      </div>
      <div className="mt-1 font-display text-base font-semibold tabular-nums text-foreground">
        {formatPriceCompact(value)}
      </div>
    </div>
  )
}
