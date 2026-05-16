"use client"

import { useMemo } from "react"
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getCategoryTrend } from "@/api/analysis"
import { koboToNaira } from "@/lib/money"

const TONE_CYCLE = [
  "var(--color-warn-500)",
  "var(--color-info-500)",
  "var(--color-purple-500)",
  "var(--color-bad-500)",
  "var(--color-lime-500)",
  "var(--color-good-500)",
] as const

function humanizeCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function CategoryTrendChart() {
  const mounted = useMounted()
  const { data, isLoading, error } = useEndpoint(
    "/analysis/category-trend",
    getCategoryTrend,
  )

  const rows = useMemo(
    () =>
      data?.items.map((item, i) => ({
        label: humanizeCategory(item.category),
        avg: koboToNaira(item.average),
        current: koboToNaira(item.current),
        fill: TONE_CYCLE[i % TONE_CYCLE.length],
      })) ?? [],
    [data?.items],
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Trend by category
        </h3>
        <Badge variant="lime" className="h-6 px-2.5 text-[11px]">
          vs 8-wk avg
        </Badge>
      </div>

      <div className="relative mt-4 h-[260px] w-full">
        {!mounted || isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : rows.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-text-3">
            Not enough spend yet to compare.
          </div>
        ) : (
          <ResponsiveContainer>
            <BarChart
              data={rows}
              margin={{ top: 12, right: 8, bottom: 0, left: -16 }}
              barCategoryGap={20}
              barGap={4}
            >
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fontSize: 11, fill: "var(--color-text-3)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={42}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: "var(--color-text-3)" }}
              />
              <Bar dataKey="avg" fill="var(--color-neutral-200)" radius={[8, 8, 0, 0]} maxBarSize={20} />
              <Bar dataKey="current" radius={[8, 8, 0, 0]} maxBarSize={20}>
                {rows.map((row) => (
                  <Cell key={row.label} fill={row.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
