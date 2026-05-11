import { Check } from "lucide-react"

const CONTEXT = [
  { label: "Last 90 days txns", value: "2,114 records"          },
  { label: "Income profile",    value: "₦612k/mo · 9 wks stable" },
  { label: "Tier",              value: "Gold · 92% conf."        },
  { label: "Active goals",      value: "Save ₦42k · Reach Platinum" },
] as const

const COACHED = [
  "Set a ₦95k food cap",
  "Move ₦25k → MMF on payday",
  "Pause Spotify · save ₦15k/yr",
] as const

export function CopilotContextRail() {
  return (
    <aside className="space-y-5 border-border bg-background px-4 py-5 sm:px-6 sm:py-6 lg:border-l">
      <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        CONTEXT COPILOT IS USING
      </h3>

      <ul className="divide-y divide-border">
        {CONTEXT.map((row) => (
          <li
            key={row.label}
            className="flex items-baseline justify-between gap-3 py-3 text-sm"
          >
            <span className="text-text-2">{row.label}</span>
            <span className="text-right font-display tabular-nums text-foreground">
              {row.value}
            </span>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl border border-lime-300 bg-lime-50/40 p-4 dark:border-lime-500/40 dark:bg-lime-500/5">
        <h4 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
          RECENTLY COACHED
        </h4>
        <ul className="mt-3 space-y-2.5">
          {COACHED.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-relaxed text-text-2"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-lime-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
