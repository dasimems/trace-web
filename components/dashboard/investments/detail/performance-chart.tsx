"use client"

import { useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"

type Range = "1M" | "3M" | "1Y" | "3Y" | "All"
const RANGES: ReadonlyArray<Range> = ["1M", "3M", "1Y", "3Y", "All"]

type WeekRow = {
  week: string
  fund: number
  bench: number
}

const DATA: ReadonlyArray<WeekRow> = [
  { week: "Wk 1", fund: 1000, bench: 1000 },
  { week: "Wk 2", fund: 1014, bench: 1006 },
  { week: "Wk 3", fund: 1028, bench: 1010 },
  { week: "Wk 4", fund: 1046, bench: 1014 },
  { week: "Wk 5", fund: 1066, bench: 1018 },
  { week: "Wk 6", fund: 1092, bench: 1022 },
  { week: "Wk 7", fund: 1124, bench: 1028 },
  { week: "Wk 8", fund: 1180, bench: 1032 },
]

export function PerformanceChart() {
  const mounted = useMounted()
  const [range, setRange] = useState<Range>("1Y")

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Performance · NAV
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Since launch · Apr 2023
        </Badge>
        <div className="ml-auto flex items-center gap-1.5">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "inline-flex h-7 items-center rounded-full px-2.5 text-xs font-medium transition-colors",
                range === r
                  ? "border border-lime-500 bg-lime-50 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"
                  : "text-text-2 hover:bg-muted hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>
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
                width={42}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: "var(--color-text-3)" }}
                domain={[960, "dataMax + 20"]}
              />
              <Line
                dataKey="bench"
                stroke="var(--color-neutral-400)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-neutral-400)",
                  stroke: "var(--color-card)",
                  strokeWidth: 2,
                }}
              />
              <Line
                dataKey="fund"
                stroke="var(--color-good-500)"
                strokeWidth={2.25}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--color-good-500)",
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
          <span className="size-2 rounded-full bg-good-500" />
          LTCF-A
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-neutral-400" />
          NGN MMF benchmark
        </li>
      </ul>
    </div>
  )
}
