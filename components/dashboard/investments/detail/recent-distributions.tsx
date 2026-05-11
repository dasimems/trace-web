import { Badge } from "@/components/ui/badge"

type Distribution = {
  month: string
  amount: string
  base: string
  yieldPct: string
}

const DISTRIBUTIONS: ReadonlyArray<Distribution> = [
  { month: "Apr 2026", amount: "+₦824", base: "₦60k", yieldPct: "1.37%" },
  { month: "Mar 2026", amount: "+₦768", base: "₦60k", yieldPct: "1.28%" },
  { month: "Feb 2026", amount: "+₦912", base: "₦60k", yieldPct: "1.52%" },
  { month: "Jan 2026", amount: "+₦680", base: "₦60k", yieldPct: "1.13%" },
]

export function RecentDistributions() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Recent distributions
      </h3>

      <ul className="mt-3 divide-y divide-border">
        {DISTRIBUTIONS.map((d) => (
          <li
            key={d.month}
            className="grid grid-cols-[1fr_auto_auto] items-baseline gap-3 py-3"
          >
            <span className="text-sm text-text-2">{d.month}</span>
            <span className="font-display text-sm tabular-nums text-foreground">
              <span className="text-lime-600 dark:text-lime-400">{d.amount}</span>{" "}
              <span className="text-text-3">/ {d.base}</span>
            </span>
            <Badge variant="good" className="h-5 px-2 text-[11px]">
              {d.yieldPct}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
