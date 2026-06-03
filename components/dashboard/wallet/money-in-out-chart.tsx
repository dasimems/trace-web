"use client"

import { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getMoneyFlow } from "@/api/analysis"

export function MoneyInOutChart() {
  const mounted = useMounted()
  const { data, isLoading, error } = useEndpoint(
    "/analysis/money-flow",
    getMoneyFlow,
  )

  const chartData = useMemo(
    () =>
      data?.weeks.map((w) => ({
        week: w.label,
        in: w.in.amount,
        out: w.out.amount,
      })) ?? [],
    [data?.weeks],
  )

  const net = useMemo(
    () =>
      data?.weeks.reduce((acc, w) => acc + (w.in.amount - w.out.amount), 0) ?? 0,
    [data?.weeks],
  )

  const formatCompact = (n: number) =>
    `₦${new Intl.NumberFormat("en-NG", { notation: "compact", maximumFractionDigits: 1 }).format(n)}`

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Money in vs out · {chartData.length || 4} weeks
        </h3>
        {data && (
          <Badge
            variant={net >= 0 ? "good" : "warn"}
            className="h-6 px-2.5 text-[11px]"
          >
            Net {net >= 0 ? "+" : ""}
            {formatCompact(net)}
          </Badge>
        )}
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-2 sm:ml-auto">
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-lime-500" />
            Money in
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            Money out
          </li>
        </ul>
      </div>

      <div className="relative mt-5 h-[220px] w-full">
        {!mounted || isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-text-3">
            No activity to chart yet.
          </div>
        ) : (
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              barGap={8}
              barCategoryGap={28}
              margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--color-border)"
                strokeDasharray="3 4"
              />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fontSize: 11, fill: "var(--color-text-3)" }}
              />
              <YAxis hide />
              <Bar
                dataKey="in"
                fill="var(--color-lime-500)"
                radius={[8, 8, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="out"
                fill="var(--color-neutral-300)"
                radius={[8, 8, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
