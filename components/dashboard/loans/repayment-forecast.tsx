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
import { useMounted } from "@/hooks/use-mounted"

type WeekRow = {
  week: string
  cash: number
  pay: number
}

const WEEKS: ReadonlyArray<WeekRow> = [
  { week: "W1",  cash: 86,  pay: 32 },
  { week: "W2",  cash: 92,  pay: 32 },
  { week: "W3",  cash: 110, pay: 32 },
  { week: "W4",  cash: 116, pay: 32 },
  { week: "W5",  cash: 102, pay: 32 },
  { week: "W6",  cash: 78,  pay: 32 },
  { week: "W7",  cash: 70,  pay: 32 },
  { week: "W8",  cash: 64,  pay: 32 },
  { week: "W9",  cash: 68,  pay: 32 },
  { week: "W10", cash: 80,  pay: 32 },
  { week: "W11", cash: 92,  pay: 32 },
  { week: "W12", cash: 102, pay: 32 },
]

export function RepaymentForecast() {
  const mounted = useMounted()
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          12-week repayment forecast
        </h3>
        <Badge variant="good" className="h-6 gap-1 px-2.5 text-[11px]">
          <Check className="size-3" />
          On-track in every week
        </Badge>
        <span className="ml-auto text-xs text-text-3">
          Modeled from 6 months of actual cash-flow
        </span>
      </div>

      <div className="relative mt-5 h-[260px] w-full">
        {mounted && (
          <ResponsiveContainer>
            <BarChart
              data={[...WEEKS]}
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
                dataKey="pay"
                fill="var(--color-neutral-200)"
                radius={[6, 6, 0, 0]}
                maxBarSize={22}
                className="dark:[&_path]:fill-neutral-800"
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
          <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          Weekly repayment
        </li>
      </ul>
    </div>
  )
}
