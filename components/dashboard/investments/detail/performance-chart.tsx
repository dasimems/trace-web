"use client"

import { useMemo, useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getNavHistory } from "@/api/investments"

type Period = "YTD" | "1Y" | "3Y"
const PERIODS: ReadonlyArray<Period> = ["YTD", "1Y", "3Y"]

export function PerformanceChart({ productId }: { productId: string }) {
  const mounted = useMounted()
  const [period, setPeriod] = useState<Period>("1Y")
  const { data, isLoading, error } = useEndpoint(
    productId
      ? `/investments/products/${productId}/nav-history?period=${period}`
      : null,
    () => getNavHistory(productId, period),
  )

  const chartData = useMemo(
    () =>
      data?.points.map((p) => ({
        date: p.date,
        nav: p.navPerUnit.amount,
      })) ?? [],
    [data?.points],
  )

  const totalReturn = data ? (data.totalReturnBps / 100).toFixed(1) : null
  const cagr = data ? (data.cagrBps / 100).toFixed(1) : null

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Performance · NAV
        </h3>
        {totalReturn !== null && (
          <Badge
            variant={data!.totalReturnBps >= 0 ? "good" : "warn"}
            className="h-6 px-2.5 text-[11px]"
          >
            {data!.totalReturnBps >= 0 ? "+" : ""}{totalReturn}% over {period}
          </Badge>
        )}
        {cagr !== null && (
          <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
            CAGR {cagr}%
          </Badge>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                "inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-medium transition-colors",
                period === p
                  ? "border-lime-500 bg-lime-50 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"
                  : "border-border bg-card text-text-2 hover:border-neutral-300 hover:text-foreground dark:hover:border-neutral-700",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-5 h-[260px] w-full">
        {!mounted || isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-text-3">
            No NAV history yet for this window.
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
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(d: string) => format(new Date(d), "MMM")}
                tick={{ fontSize: 11, fill: "var(--color-text-3)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={48}
                tickFormatter={(v: number) => `₦${v.toFixed(0)}`}
                tick={{ fontSize: 11, fill: "var(--color-text-3)" }}
                domain={["auto", "auto"]}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
                formatter={(value) =>
                  [`₦${Number(value ?? 0).toFixed(2)}`, "NAV"]
                }
                labelFormatter={(d) =>
                  format(new Date(d as string), "d MMM yyyy")
                }
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                dataKey="nav"
                stroke="var(--color-good-500)"
                strokeWidth={2.25}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-good-500)",
                  stroke: "var(--color-card)",
                  strokeWidth: 2,
                }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
