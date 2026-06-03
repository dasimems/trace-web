"use client"

import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getPortfolio } from "@/api/investments"
import { formatPriceCompact } from "@/lib/money"

const TONE_CYCLE = [
  { fill: "var(--color-lime-500)",   dot: "bg-lime-500"   },
  { fill: "var(--color-info-500)",   dot: "bg-info-500"   },
  { fill: "var(--color-purple-500)", dot: "bg-purple-500" },
  { fill: "var(--color-warn-500)",   dot: "bg-warn-500"   },
  { fill: "var(--color-good-500)",   dot: "bg-good-500"   },
  { fill: "var(--color-bad-500)",    dot: "bg-bad-500"    },
]

export function PortfolioCard() {
  const mounted = useMounted()
  const { data, isLoading, error } = useEndpoint(
    "/investments/portfolio",
    getPortfolio,
  )

  const holdings = useMemo(
    () =>
      data?.holdings.map((h, i) => ({
        ...h,
        fill: TONE_CYCLE[i % TONE_CYCLE.length].fill,
        dot: TONE_CYCLE[i % TONE_CYCLE.length].dot,
      })) ?? [],
    [data?.holdings],
  )

  const returnPercent = data ? (data.totalReturnBps / 100).toFixed(1) : null

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        <h3 className="font-display text-base font-semibold text-foreground">
          {data ? `Your portfolio · ${formatPriceCompact(data.totalValue)}` : "Your portfolio"}
        </h3>
        {returnPercent && (
          <Badge
            variant={data!.totalReturnBps >= 0 ? "good" : "warn"}
            className="h-6 px-2.5 text-[11px]"
          >
            {data!.totalReturnBps >= 0 ? "+" : ""}{returnPercent}% return
          </Badge>
        )}
      </div>

      {holdings.length === 0 ? (
        isLoading ? (
          <PortfolioSkeleton />
        ) : error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-4 text-sm text-text-3">
            No investments yet — pick one below to start.
          </p>
        )
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-5 sm:gap-6">
          <div className="relative h-[160px] w-[160px] shrink-0">
            {mounted && (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={holdings}
                    dataKey="percent"
                    nameKey="label"
                    innerRadius={52}
                    outerRadius={76}
                    paddingAngle={2}
                    strokeWidth={0}
                    isAnimationActive
                  >
                    {holdings.map((h) => (
                      <Cell key={h.label} fill={h.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-xl font-semibold tabular-nums tracking-tight text-foreground">
                {data ? formatPriceCompact(data.totalValue) : ""}
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-text-3">
                PORTFOLIO
              </span>
            </div>
          </div>

          <ul className="min-w-0 flex-1 space-y-2.5 text-sm">
            {holdings.map((holding) => (
              <li
                key={holding.label}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3"
              >
                <span className="flex min-w-0 items-center gap-2 text-text-2">
                  <span
                    className={`size-2 shrink-0 rounded-full ${holding.dot}`}
                  />
                  <span className="truncate">{holding.label}</span>
                </span>
                <span className="font-display tabular-nums text-foreground">
                  {formatPriceCompact(holding.amount)}
                </span>
                <Badge variant="secondary" className="h-5 px-2 text-[11px]">
                  {Math.round(holding.percent)}%
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function PortfolioSkeleton() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-5 sm:gap-6">
      <Skeleton className="h-[160px] w-[160px] rounded-full" />
      <ul className="min-w-0 flex-1 space-y-2.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-10" />
          </li>
        ))}
      </ul>
    </div>
  )
}
