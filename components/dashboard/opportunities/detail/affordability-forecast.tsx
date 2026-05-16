"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { Check, TriangleAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getCashFlow } from "@/api/analysis"
import { koboToNaira } from "@/lib/money"

export function AffordabilityForecast() {
  const mounted = useMounted()
  const { data, isLoading, error } = useEndpoint(
    "/analysis/cashflow",
    getCashFlow,
  )

  const chartData =
    data?.weeks.map((w) => ({
      week: w.label,
      cash: Math.max(0, koboToNaira(w.income - w.spend)),
    })) ?? []

  const onTrack =
    chartData.length > 0 && chartData.every((w) => w.cash > 0)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          {chartData.length || 12}-week affordability forecast
        </h3>
        {data ? (
          <Badge
            variant={onTrack ? "good" : "warn"}
            className="h-6 gap-1 px-2.5 text-[11px]"
          >
            {onTrack ? (
              <Check className="size-3" />
            ) : (
              <TriangleAlert className="size-3" />
            )}
            {onTrack ? "On-track every week" : "Some weeks are tight"}
          </Badge>
        ) : null}
        <span className="ml-auto text-xs text-text-3">
          Modeled from your actual cash-flow
        </span>
      </div>

      <div className="relative mt-5 h-[220px] w-full">
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
              barCategoryGap={18}
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
                radius={[8, 8, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
