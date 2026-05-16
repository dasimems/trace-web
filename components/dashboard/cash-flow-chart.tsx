"use client"

import { useMemo } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getCashFlow } from "@/api/analysis"
import { koboToNaira } from "@/lib/money"

type ChartPoint = {
  week: string
  income: number
  spend: number
  forecast: number | null
}

export function CashFlowChart() {
  const mounted = useMounted()
  const { data, isLoading, error } = useEndpoint("/analysis/cashflow", getCashFlow)

  const chartData = useMemo<ChartPoint[]>(
    () =>
      data?.weeks.map((w) => ({
        week: w.label,
        income: koboToNaira(w.income),
        spend: koboToNaira(w.spend),
        forecast: w.forecast ? koboToNaira(w.forecast) : null,
      })) ?? [],
    [data?.weeks],
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Cash flow · Income vs spend
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          {chartData.length > 0 ? `${chartData.length} weeks` : "8 weeks"}
        </Badge>
        <ul className="ml-auto flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-2">
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-lime-500" />
            Income
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-bad-500" />
            Spend
          </li>
          <li className="flex items-center gap-1.5">
            <span className="block w-4 border-t-2 border-dashed border-info-500" />
            Forecast
          </li>
        </ul>
      </div>

      <div className="mt-5 h-[220px] w-full sm:h-[280px]">
        {!mounted || isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-text-3">
            Not enough activity yet to draw cash flow.
          </div>
        ) : (
          <ResponsiveContainer>
            <LineChart
              data={chartData}
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
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={42}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: "var(--color-text-3)" }}
              />
              <Line
                dataKey="income"
                stroke="var(--color-lime-500)"
                strokeWidth={2.25}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--color-lime-500)",
                  stroke: "var(--color-card)",
                  strokeWidth: 2,
                }}
                isAnimationActive
              />
              <Line
                dataKey="spend"
                stroke="var(--color-bad-500)"
                strokeWidth={2.25}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--color-bad-500)",
                  stroke: "var(--color-card)",
                  strokeWidth: 2,
                }}
                isAnimationActive
              />
              <Line
                dataKey="forecast"
                stroke="var(--color-info-500)"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-info-500)",
                  stroke: "var(--color-card)",
                  strokeWidth: 2,
                }}
                connectNulls
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
