"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type TierState = "done" | "current" | "locked"

type Tier = {
  name: string
  limit: string
  apr: string
  state: TierState
  status: string
  /** Only set when state === "locked" — progress toward unlock. */
  unlockProgress?: { value: number; total: number }
  /** Tone for the tier name. */
  nameTone: "tier-bronze" | "tier-silver" | "tier-gold" | "tier-platinum"
}

const TIERS: ReadonlyArray<Tier> = [
  {
    name: "Bronze",
    limit: "₦50k",
    apr: "24% APR",
    state: "done",
    status: "Done · 4 weeks ago",
    nameTone: "tier-bronze",
  },
  {
    name: "Silver",
    limit: "₦300k",
    apr: "19% APR",
    state: "done",
    status: "Done · 2 weeks ago",
    nameTone: "tier-silver",
  },
  {
    name: "Gold",
    limit: "₦1.8M",
    apr: "14.5% APR",
    state: "current",
    status: "You are here",
    nameTone: "tier-gold",
  },
  {
    name: "Platinum",
    limit: "₦8M+",
    apr: "11% APR",
    state: "locked",
    status: "6 weeks at Gold to unlock",
    unlockProgress: { value: 2, total: 6 },
    nameTone: "tier-platinum",
  },
]

const NAME_COLOR: Record<Tier["nameTone"], string> = {
  "tier-bronze":   "text-tier-bronze",
  "tier-silver":   "text-tier-silver",
  "tier-gold":     "text-tier-gold",
  "tier-platinum": "text-tier-platinum dark:text-neutral-200",
}

export function TierLadder() {
  return (
    <section className="space-y-3">
      <h2 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        TIER LADDER · YOU ARE ON GOLD
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TIERS.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </section>
  )
}

function TierCard({ tier }: { tier: Tier }) {
  const current = tier.state === "current"
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-card p-5 shadow-card transition-colors",
        current
          ? "border-lime-400 bg-lime-50/30 dark:border-lime-500/50 dark:bg-lime-500/5"
          : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className={cn("font-display text-lg font-semibold", NAME_COLOR[tier.nameTone])}>
          {tier.name}
        </div>
        {current ? (
          <Badge variant="lime" className="h-6 px-2.5 text-[11px]">
            Current
          </Badge>
        ) : (
          <span className="text-right text-[11px] text-text-3">{tier.status}</span>
        )}
      </div>

      <div className="mt-4 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
        {tier.limit}
      </div>
      <div className="mt-1 text-xs text-text-3">
        limit · {tier.apr}
      </div>

      {current && (
        <div className="mt-4 text-xs font-medium text-foreground">{tier.status}</div>
      )}

      {tier.state === "locked" && tier.unlockProgress && (
        <div className="mt-4 space-y-1.5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{
                width: `${(tier.unlockProgress.value / tier.unlockProgress.total) * 100}%`,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block h-full rounded-full bg-lime-500"
            />
          </div>
          <div className="text-[11px] text-text-3">
            {tier.unlockProgress.value} / {tier.unlockProgress.total} weeks
          </div>
        </div>
      )}
    </div>
  )
}
