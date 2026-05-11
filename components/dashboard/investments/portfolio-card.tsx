"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Badge } from "@/components/ui/badge"
import { useMounted } from "@/hooks/use-mounted"

type Holding = {
  label: string
  amount: string
  percent: number
  delta: string
  fillVar: string
  dotClass: string
}

const HOLDINGS: ReadonlyArray<Holding> = [
  {
    label: "Money market",
    amount: "₦83,000",
    percent: 45,
    delta: "+9.1%",
    fillVar: "var(--color-lime-500)",
    dotClass: "bg-lime-500",
  },
  {
    label: "T-Bills",
    amount: "₦55,400",
    percent: 30,
    delta: "+6.4%",
    fillVar: "var(--color-info-500)",
    dotClass: "bg-info-500",
  },
  {
    label: "Coop fund",
    amount: "₦27,700",
    percent: 15,
    delta: "+12.8%",
    fillVar: "var(--color-purple-500)",
    dotClass: "bg-purple-500",
  },
  {
    label: "Sector ETF",
    amount: "₦18,400",
    percent: 10,
    delta: "+4.2%",
    fillVar: "var(--color-warn-500)",
    dotClass: "bg-warn-500",
  },
]

export function PortfolioCard() {
  const mounted = useMounted()
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        <h3 className="font-display text-base font-semibold text-foreground">
          Your portfolio · ₦184,500
        </h3>
        <Badge variant="good" className="h-6 px-2.5 text-[11px]">
          +8.4% YTD
        </Badge>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-5 sm:gap-6">
        <div className="relative h-[160px] w-[160px] shrink-0">
          {mounted && (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[...HOLDINGS]}
                  dataKey="percent"
                  nameKey="label"
                  innerRadius={52}
                  outerRadius={76}
                  paddingAngle={2}
                  strokeWidth={0}
                  isAnimationActive
                >
                  {HOLDINGS.map((h) => (
                    <Cell key={h.label} fill={h.fillVar} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-xl font-semibold tabular-nums tracking-tight text-foreground">
              ₦184.5k
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-text-3">
              PORTFOLIO
            </span>
          </div>
        </div>

        <ul className="min-w-0 flex-1 space-y-2.5 text-sm">
          {HOLDINGS.map((holding) => (
            <li
              key={holding.label}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-3"
            >
              <span className="flex min-w-0 items-center gap-2 text-text-2">
                <span className={`size-2 shrink-0 rounded-full ${holding.dotClass}`} />
                <span className="truncate">{holding.label}</span>
              </span>
              <span className="font-display tabular-nums text-foreground">
                {holding.amount}
              </span>
              <Badge variant="good" className="h-5 px-2 text-[11px]">
                {holding.delta}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
