"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getCashFlow } from "@/api/analysis"
import { koboToNaira } from "@/lib/money"

export function RepaymentForecast() {
  const mounted = useMounted()
  const { data, isLoading, error } = useEndpoint(
    "/analysis/cashflow",
    getCashFlow,
  )

  const chartData =
    data?.weeks.map((w) => ({
      week: w.label,
      cash: koboToNaira(Math.max(0, w.income - w.spend)),
      forecast: w.forecast ? koboToNaira(w.forecast) : null,
    })) ?? []

  const everyWeekPositive =
    chartData.length > 0 && chartData.every((w) => w.cash >= 0)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          {chartData.length || 12}-week cashflow forecast
        </h3>
        {data && (
          <Badge
            variant={everyWeekPositive ? "good" : "warn"}
            className="h-6 gap-1 px-2.5 text-[11px]"
          >
            {everyWeekPositive && <Check className="size-3" />}
            {everyWeekPositive
              ? "On-track in every week"
              : "Some weeks dip into the red"}
          </Badge>
        )}
        <span className="ml-auto text-xs text-text-3">
          Modeled from your actual cash-flow
        </span>
      </div>

      <div className="relative mt-5 h-[260px] w-full">
        {!mounted || isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-text-3">
            Not enough cash-flow yet to forecast.
          </div>
        ) : (
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              barGap={4}
              barCategoryGap={20}
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
                dataKey="cash"
                fill="var(--color-lime-500)"
                radius={[6, 6, 0, 0]}
                maxBarSize={22}
              />
              <Bar
                dataKey="forecast"
                fill="var(--color-info-500)"
                radius={[6, 6, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-text-2">
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-lime-500" />
          Projected free cash
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-info-500" />
          Forecast
        </li>
      </ul>
    </div>
  )
}
