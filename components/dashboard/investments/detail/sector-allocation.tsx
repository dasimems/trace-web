"use client"

import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getSectorAllocation } from "@/api/investments"
import { formatPriceCompact } from "@/lib/money"

const TONE_CYCLE = [
  { fill: "var(--color-good-500)",   dot: "bg-good-500"   },
  { fill: "var(--color-lime-500)",   dot: "bg-lime-500"   },
  { fill: "var(--color-info-500)",   dot: "bg-info-500"   },
  { fill: "var(--color-purple-500)", dot: "bg-purple-500" },
  { fill: "var(--color-warn-500)",   dot: "bg-warn-500"   },
  { fill: "var(--color-bad-500)",    dot: "bg-bad-500"    },
]

export function SectorAllocation({ productId }: { productId: string }) {
  const mounted = useMounted()
  const { data, isLoading, error } = useEndpoint(
    productId ? `/investments/products/${productId}/sector-allocation` : null,
    () => getSectorAllocation(productId),
  )

  const slices = useMemo(
    () =>
      data?.slices.map((s, i) => ({
        ...s,
        fill: TONE_CYCLE[i % TONE_CYCLE.length].fill,
        dot: TONE_CYCLE[i % TONE_CYCLE.length].dot,
      })) ?? [],
    [data?.slices],
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Sector allocation
      </h3>

      {slices.length === 0 ? (
        isLoading ? (
          <SectorSkeleton />
        ) : error ? (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-3 text-sm text-text-3">No allocation breakdown.</p>
        )
      ) : (
        <div className="mt-4 flex items-center gap-5">
          <div className="relative h-[140px] w-[140px] shrink-0">
            {mounted && (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={slices}
                    dataKey="percent"
                    nameKey="sector"
                    innerRadius={44}
                    outerRadius={64}
                    paddingAngle={2}
                    strokeWidth={0}
                    isAnimationActive
                  >
                    {slices.map((s) => (
                      <Cell key={s.sector} fill={s.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <ul className="min-w-0 flex-1 space-y-2.5 text-sm">
            {slices.map((slice) => (
              <li
                key={slice.sector}
                className="grid grid-cols-[1fr_auto_3rem] items-center gap-2"
              >
                <span className="flex min-w-0 items-center gap-2 text-text-2">
                  <span
                    className={`size-2 shrink-0 rounded-full ${slice.dot}`}
                  />
                  <span className="truncate">{slice.sector}</span>
                </span>
                <span className="font-display tabular-nums text-foreground">
                  {formatPriceCompact(slice.amount)}
                </span>
                <span className="text-right text-xs text-text-3 tabular-nums">
                  {Math.round(slice.percent)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function SectorSkeleton() {
  return (
    <div className="mt-4 flex items-center gap-5">
      <Skeleton className="h-[140px] w-[140px] rounded-full" />
      <ul className="min-w-0 flex-1 space-y-2.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="grid grid-cols-[1fr_auto_3rem] items-center gap-2"
          >
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-3 w-8" />
          </li>
        ))}
      </ul>
    </div>
  )
}
