import { cn } from "@/lib/utils"

type TierState = "live" | "next" | "later"

type Tier = {
  name: string
  badge: string
  state: TierState
  detail: string
}

const TIERS: readonly Tier[] = [
  {
    name: "Tier 1 · Basic",
    badge: "Live now",
    state: "live",
    detail: "₦50k loans · ₦200k investments",
  },
  {
    name: "Tier 2 · Verified",
    badge: "After this step",
    state: "next",
    detail: "₦500k loans · ₦2M investments",
  },
  {
    name: "Tier 3 · Business",
    badge: "After 8 weeks of activity",
    state: "later",
    detail: "No cap · Provider matching",
  },
] as const

const BADGE_CLASSES: Record<TierState, string> = {
  live: "bg-good-50 text-good-700 border-good-200 dark:bg-good-500/15 dark:text-good-300 dark:border-good-500/30",
  next: "bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-500/15 dark:text-lime-300 dark:border-lime-500/30",
  later:
    "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700",
}

export function TierPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-card",
        className,
      )}
    >
      <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        TIER PREVIEW
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-2">
        What completing KYC unlocks for you, based on what we already see.
      </p>

      <ul className="mt-5 space-y-5">
        {TIERS.map((tier) => (
          <li key={tier.name} className="space-y-1.5">
            <div className="flex items-start justify-between gap-3">
              <div className="font-display text-sm font-semibold text-foreground">
                {tier.name}
              </div>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
                  BADGE_CLASSES[tier.state],
                )}
              >
                {tier.badge}
              </span>
            </div>
            <div className="text-sm text-text-3">{tier.detail}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
