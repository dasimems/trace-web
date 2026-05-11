import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

type SummaryRow = { label: string; value: ReactNode }

const ROWS: ReadonlyArray<SummaryRow> = [
  { label: "Limit",          value: "₦1.8M"           },
  { label: "APR",            value: "14.5%"           },
  { label: "Tenor",          value: "6 months"        },
  { label: "Fees",           value: "1.0% origination" },
  { label: "Repay cadence",  value: "Daily · Mon–Sat" },
  { label: "Decision time",  value: "~4 minutes"      },
]

export function EstimatedForYouCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Estimated for you
        </h3>
        <Badge variant="good" className="h-6 px-2.5 text-[11px]">
          92% approval
        </Badge>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
        {ROWS.map((row) => (
          <div key={row.label}>
            <dt className="text-xs text-text-3">{row.label}</dt>
            <dd className="mt-1 font-display text-base font-semibold tabular-nums tracking-tight text-foreground">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

const COST_LINES = [
  { label: "Principal",            value: "₦1,200,000" },
  { label: "Interest (14.5% · 6mo)", value: "₦161,840" },
  { label: "Origination (1.0%)",   value: "₦12,000"    },
  { label: "Insurance (waivable)", value: "₦0"         },
] as const

export function CostBreakdownCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Total cost breakdown
      </h3>

      <ul className="mt-4 space-y-2.5">
        {COST_LINES.map((line) => (
          <li
            key={line.label}
            className="flex items-baseline justify-between gap-3 text-sm"
          >
            <span className="text-text-2">{line.label}</span>
            <span className="font-display tabular-nums text-foreground">
              {line.value}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
        <span className="font-display text-base font-semibold text-foreground">
          You repay
        </span>
        <span className="font-display text-2xl font-semibold tabular-nums tracking-tight text-foreground">
          ₦1,373,840
        </span>
      </div>

      <p className="mt-3 text-xs text-text-3">
        Trace shows total cost first — never just the monthly figure.
      </p>
    </div>
  )
}
