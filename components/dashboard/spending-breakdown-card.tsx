"use client"

import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  getSpendingBreakdown,
  type TSpendingBreakdownItem,
} from "@/api/analysis"
import { formatPrice, formatPriceCompact } from "@/lib/money"

const TONE_CYCLE: ReadonlyArray<SliceTone> = [
  "warn",
  "info",
  "purple",
  "good",
  "bad",
  "lime",
]

type SliceTone = "warn" | "info" | "purple" | "good" | "bad" | "lime"

const FILL_VAR: Record<SliceTone, string> = {
  warn: "var(--color-warn-500)",
  info: "var(--color-info-500)",
  purple: "var(--color-purple-500)",
  good: "var(--color-good-500)",
  bad: "var(--color-bad-500)",
  lime: "var(--color-lime-500)",
}

const DOT_CLASS: Record<SliceTone, string> = {
  warn: "bg-warn-500",
  info: "bg-info-500",
  purple: "bg-purple-500",
  good: "bg-good-500",
  bad: "bg-bad-500",
  lime: "bg-lime-500",
}

function humanizeCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

type SliceView = {
  label: string
  amount: string
  percent: number
  tone: SliceTone
}

function toSliceViews(items: TSpendingBreakdownItem[]): SliceView[] {
  return items.map((item, i) => ({
    label: humanizeCategory(item.category),
    amount: formatPriceCompact(item.amount),
    percent: Math.round(item.percent),
    tone: TONE_CYCLE[i % TONE_CYCLE.length],
  }))
}

export function SpendingBreakdownCard() {
  const mounted = useMounted()
  const { data, isLoading, error } = useEndpoint(
    "/analysis/spending-breakdown",
    getSpendingBreakdown,
  )

  const slices = useMemo(
    () => (data ? toSliceViews(data.items) : []),
    [data],
  )
  const totalLabel = data ? formatPriceCompact(data.total) : ""

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">
          Spending breakdown
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          This month
        </Badge>
      </div>

      {slices.length === 0 ? (
        isLoading ? (
          <BreakdownSkeleton />
        ) : error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-6 text-sm text-text-3">No data yet.</p>
        )
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-5">
          <div className="relative h-[156px] w-[156px] shrink-0">
            {mounted && (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={slices}
                    dataKey="percent"
                    nameKey="label"
                    innerRadius={50}
                    outerRadius={72}
                    paddingAngle={2}
                    strokeWidth={0}
                    isAnimationActive
                  >
                    {slices.map((slice) => (
                      <Cell key={slice.label} fill={FILL_VAR[slice.tone]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="font-display text-xl font-semibold tabular-nums tracking-tight text-foreground"
                title={data ? formatPrice(data.total) : ""}
              >
                {totalLabel}
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-text-3">
                SPENT
              </span>
            </div>
          </div>

          <ul className="min-w-0 flex-1 space-y-2.5 text-sm">
            {slices.map((slice) => (
              <li
                key={slice.label}
                className="grid grid-cols-[1fr_auto_3rem] items-center gap-2"
              >
                <span className="flex min-w-0 items-center gap-2 text-text-2">
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      DOT_CLASS[slice.tone],
                    )}
                  />
                  <span className="truncate">{slice.label}</span>
                </span>
                <span className="font-display tabular-nums text-foreground">
                  {slice.amount}
                </span>
                <span className="text-right text-xs text-text-3 tabular-nums">
                  {slice.percent}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function BreakdownSkeleton() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-5">
      <Skeleton className="h-[156px] w-[156px] rounded-full" />
      <ul className="min-w-0 flex-1 space-y-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
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
