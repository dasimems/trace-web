"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { useMounted } from "@/hooks/use-mounted"

type WeekRow = {
  week: string
  in: number
  out: number
}

const DATA: ReadonlyArray<WeekRow> = [
  { week: "W1", in: 96,  out: 58 },
  { week: "W2", in: 142, out: 92 },
  { week: "W3", in: 168, out: 118 },
  { week: "W4", in: 220, out: 124 },
]

export function MoneyInOutChart() {
  const mounted = useMounted()
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Money in vs out · 30 days
        </h3>
        <Badge variant="good" className="h-6 px-2.5 text-[11px]">
          Net +₦174,210
        </Badge>
        <ul className="ml-auto flex items-center gap-4 text-xs text-text-2">
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
        {mounted && (
          <ResponsiveContainer>
            <BarChart
              data={[...DATA]}
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

      <div className="mt-3 flex justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-3 py-1 font-mono text-[11px] tracking-wide text-white">
          <span className="size-1.5 rounded-full bg-lime-500" />
          Friday-Sunday accounts for 64% of inflow
        </span>
      </div>
    </div>
  )
}
