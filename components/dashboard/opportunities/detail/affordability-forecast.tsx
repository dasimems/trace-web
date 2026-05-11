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

type WeekRow = { week: string; cash: number }

const WEEKS: ReadonlyArray<WeekRow> = [
  { week: "W1",  cash: 78  },
  { week: "W2",  cash: 96  },
  { week: "W3",  cash: 110 },
  { week: "W4",  cash: 82  },
  { week: "W5",  cash: 68  },
  { week: "W6",  cash: 56  },
  { week: "W7",  cash: 50  },
  { week: "W8",  cash: 58  },
  { week: "W9",  cash: 70  },
  { week: "W10", cash: 88  },
  { week: "W11", cash: 102 },
  { week: "W12", cash: 116 },
]

export function AffordabilityForecast() {
  const mounted = useMounted()
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          12-week affordability forecast
        </h3>
        <Badge variant="good" className="h-6 gap-1 px-2.5 text-[11px]">
          <Check className="size-3" />
          On-track every week
        </Badge>
        <span className="ml-auto text-xs text-text-3">
          Modeled from 6 months of cash-flow
        </span>
      </div>

      <div className="relative mt-5 h-[220px] w-full">
        {mounted && (
          <ResponsiveContainer>
            <BarChart
              data={[...WEEKS]}
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
