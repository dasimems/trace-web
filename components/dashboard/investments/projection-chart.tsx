"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { useMounted } from "@/hooks/use-mounted"

type WeekRow = {
  week: string
  median: number
  p90: number
  p10: number
}

const DATA: ReadonlyArray<WeekRow> = [
  { week: "Wk 1", median: 184, p90: 184, p10: 184 },
  { week: "Wk 2", median: 188, p90: 192, p10: 184 },
  { week: "Wk 3", median: 192, p90: 198, p10: 184 },
  { week: "Wk 4", median: 198, p90: 208, p10: 186 },
  { week: "Wk 5", median: 204, p90: 216, p10: 188 },
  { week: "Wk 6", median: 210, p90: 226, p10: 188 },
  { week: "Wk 7", median: 218, p90: 236, p10: 190 },
  { week: "Wk 8", median: 224, p90: 248, p10: 190 },
]

export function ProjectionChart() {
  const mounted = useMounted()
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          12-month projection
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Monte-Carlo · 1k simulations
        </Badge>
        <span className="ml-auto text-xs text-text-3">
          Median{" "}
          <span className="font-semibold text-foreground">+14.2%</span> · 90% CI
          ±3.4pts
        </span>
      </div>

      <div className="relative mt-5 h-[260px] w-full">
        {mounted && (
          <ResponsiveContainer>
            <LineChart
              data={[...DATA]}
              margin={{ top: 8, right: 12, bottom: 0, left: -12 }}
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
                width={48}
                tickFormatter={(v: number) => `₦${v}k`}
                tick={{ fontSize: 11, fill: "var(--color-text-3)" }}
                domain={[160, "dataMax + 10"]}
              />
              <Line
                dataKey="p90"
                stroke="var(--color-info-500)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-info-500)",
                  stroke: "var(--color-card)",
                  strokeWidth: 2,
                }}
              />
              <Line
                dataKey="median"
                stroke="var(--color-lime-500)"
                strokeWidth={2.25}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--color-lime-500)",
                  stroke: "var(--color-card)",
                  strokeWidth: 2,
                }}
              />
              <Line
                dataKey="p10"
                stroke="var(--color-bad-500)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-bad-500)",
                  stroke: "var(--color-card)",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-text-2">
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-lime-500" />
          Median
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-info-500" />
          90th percentile
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-bad-500" />
          10th percentile
        </li>
      </ul>
    </div>
  )
}
