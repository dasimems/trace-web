"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { useMounted } from "@/hooks/use-mounted"

type Sector = {
  label: string
  percent: number
  fillVar: string
  dotClass: string
}

const SECTORS: ReadonlyArray<Sector> = [
  { label: "Textiles",  percent: 45, fillVar: "var(--color-good-500)",   dotClass: "bg-good-500"   },
  { label: "Wholesale", percent: 22, fillVar: "var(--color-lime-500)",   dotClass: "bg-lime-500"   },
  { label: "Agro",      percent: 18, fillVar: "var(--color-info-500)",   dotClass: "bg-info-500"   },
  { label: "Services",  percent: 9,  fillVar: "var(--color-purple-500)", dotClass: "bg-purple-500" },
  { label: "Mfg.",      percent: 6,  fillVar: "var(--color-warn-500)",   dotClass: "bg-warn-500"   },
]

export function SectorAllocation() {
  const mounted = useMounted()
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Sector allocation
      </h3>

      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-[140px] w-[140px] shrink-0">
          {mounted && (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[...SECTORS]}
                  dataKey="percent"
                  nameKey="label"
                  innerRadius={44}
                  outerRadius={64}
                  paddingAngle={2}
                  strokeWidth={0}
                  isAnimationActive
                >
                  {SECTORS.map((s) => (
                    <Cell key={s.label} fill={s.fillVar} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-base font-semibold tabular-nums tracking-tight text-foreground">
              5 sectors
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-text-3">
              DIVERSIFIED
            </span>
          </div>
        </div>

        <ul className="min-w-0 flex-1 space-y-2 text-sm">
          {SECTORS.map((sector) => (
            <li
              key={sector.label}
              className="grid grid-cols-[1fr_auto] items-center gap-3"
            >
              <span className="flex min-w-0 items-center gap-2 text-text-2">
                <span
                  className={`size-2 shrink-0 rounded-full ${sector.dotClass}`}
                />
                <span className="truncate">{sector.label}</span>
              </span>
              <span className="font-display tabular-nums text-foreground">
                {sector.percent}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
