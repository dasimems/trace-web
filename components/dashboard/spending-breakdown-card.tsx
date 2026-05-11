"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"

type SliceTone = "warn" | "info" | "purple" | "good" | "bad"

type Slice = {
  label: string
  amount: string
  percent: number
  tone: SliceTone
}

const SLICES: ReadonlyArray<Slice> = [
  { label: "Food & dining",     amount: "₦118k", percent: 38, tone: "warn"   },
  { label: "Transport",         amount: "₦69k",  percent: 22, tone: "info"   },
  { label: "Bills & utilities", amount: "₦56k",  percent: 18, tone: "purple" },
  { label: "Shopping",          amount: "₦37k",  percent: 12, tone: "good"   },
  { label: "Other",             amount: "₦32k",  percent: 10, tone: "bad"    },
]

const TOTAL = "₦312k"

const FILL_VAR: Record<SliceTone, string> = {
  warn:   "var(--color-warn-500)",
  info:   "var(--color-info-500)",
  purple: "var(--color-purple-500)",
  good:   "var(--color-good-500)",
  bad:    "var(--color-bad-500)",
}

const DOT_CLASS: Record<SliceTone, string> = {
  warn:   "bg-warn-500",
  info:   "bg-info-500",
  purple: "bg-purple-500",
  good:   "bg-good-500",
  bad:    "bg-bad-500",
}

export function SpendingBreakdownCard() {
  const mounted = useMounted()
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">
          Spending breakdown
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          This month
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-5">
        <div className="relative h-[156px] w-[156px] shrink-0">
          {mounted && (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[...SLICES]}
                  dataKey="percent"
                  nameKey="label"
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={2}
                  strokeWidth={0}
                  isAnimationActive
                >
                  {SLICES.map((slice) => (
                    <Cell key={slice.label} fill={FILL_VAR[slice.tone]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-xl font-semibold tabular-nums tracking-tight text-foreground">
              {TOTAL}
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-text-3">
              SPENT
            </span>
          </div>
        </div>

        <ul className="min-w-0 flex-1 space-y-2.5 text-sm">
          {SLICES.map((slice) => (
            <li
              key={slice.label}
              className="grid grid-cols-[1fr_auto_3rem] items-center gap-2"
            >
              <span className="flex min-w-0 items-center gap-2 text-text-2">
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    DOT_CLASS[slice.tone],
                  )}
                />
                <span className="truncate">{slice.label}</span>
              </span>
              <span className="font-display tabular-nums text-foreground">
                {slice.amount}
              </span>
              <span className="text-right text-xs text-text-3 tabular-nums">
                {slice.percent}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
