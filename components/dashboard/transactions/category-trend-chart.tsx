"use client"

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { useMounted } from "@/hooks/use-mounted"

type CategoryRow = {
  label: string
  avg: number
  current: number
  fill: string
}

const ROWS: ReadonlyArray<CategoryRow> = [
  { label: "Food",     avg: 78,  current: 124, fill: "var(--color-warn-500)"   },
  { label: "Transport", avg: 64, current: 72,  fill: "var(--color-info-500)"   },
  { label: "Bills",    avg: 60,  current: 64,  fill: "var(--color-purple-500)" },
  { label: "Shopping", avg: 32,  current: 28,  fill: "var(--color-bad-500)"    },
  { label: "Other",    avg: 30,  current: 24,  fill: "var(--color-lime-500)"   },
]

export function CategoryTrendChart() {
  const mounted = useMounted()
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
        {mounted && (
          <ResponsiveContainer>
            <BarChart
              data={[...ROWS]}
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
              <YAxis hide />
              <Bar
                dataKey="avg"
                radius={[6, 6, 0, 0]}
                maxBarSize={26}
                fill="var(--color-neutral-200)"
                className="dark:[&_path]:fill-neutral-800"
              />
              <Bar dataKey="current" radius={[6, 6, 0, 0]} maxBarSize={26}>
                {ROWS.map((row) => (
                  <Cell key={row.label} fill={row.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-3 flex justify-start">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-3 py-1 font-mono text-[11px] tracking-wide text-white">
          <span className="size-1.5 rounded-full bg-bad-400" />
          Food category broke 8-week pattern · 5 nights running
        </span>
      </div>
    </div>
  )
}
