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

type WeekPoint = {
  week: string
  income: number
  spend: number
  forecast: number | null
}

const DATA: ReadonlyArray<WeekPoint> = [
  { week: "Wk 1", income: 320, spend: 180, forecast: null  },
  { week: "Wk 2", income: 480, spend: 320, forecast: null  },
  { week: "Wk 3", income: 240, spend: 360, forecast: null  },
  { week: "Wk 4", income: 690, spend: 360, forecast: null  },
  { week: "Wk 5", income: 590, spend: 380, forecast: 410   },
  { week: "Wk 6", income: 880, spend: 420, forecast: 500   },
  { week: "Wk 7", income: 920, spend: 460, forecast: 540   },
  { week: "Wk 8", income: 1180, spend: 540, forecast: 600  },
]

export function CashFlowChart() {
  const mounted = useMounted()
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Cash flow · Income vs spend
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          8 weeks
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
        {mounted && (
          <ResponsiveContainer>
            <LineChart
              data={[...DATA]}
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
