"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getLoanTier } from "@/api/loans"
import { LoanTier } from "@/lib/enum"
import { formatPriceCompact } from "@/lib/money"

type TierVisual = {
  tier: LoanTier
  name: string
  limitFallback: string
  apr: string
  nameTone: "tier-bronze" | "tier-silver" | "tier-gold" | "tier-platinum"
}

const TIERS: ReadonlyArray<TierVisual> = [
  { tier: LoanTier.BRONZE,   name: "Bronze",   limitFallback: "₦50k", apr: "24% APR",   nameTone: "tier-bronze"   },
  { tier: LoanTier.SILVER,   name: "Silver",   limitFallback: "₦300k", apr: "19% APR",  nameTone: "tier-silver"   },
  { tier: LoanTier.GOLD,     name: "Gold",     limitFallback: "₦1.8M", apr: "14.5% APR", nameTone: "tier-gold"     },
  { tier: LoanTier.PLATINUM, name: "Platinum", limitFallback: "₦8M+",  apr: "11% APR",   nameTone: "tier-platinum" },
]

const NAME_COLOR: Record<TierVisual["nameTone"], string> = {
  "tier-bronze":   "text-tier-bronze",
  "tier-silver":   "text-tier-silver",
  "tier-gold":     "text-tier-gold",
  "tier-platinum": "text-tier-platinum dark:text-neutral-200",
}

const TIER_ORDER = [
  LoanTier.BRONZE,
  LoanTier.SILVER,
  LoanTier.GOLD,
  LoanTier.PLATINUM,
]

function stateFor(
  tier: LoanTier,
  current: LoanTier | undefined,
): "done" | "current" | "locked" {
  if (!current) return "locked"
  const idx = TIER_ORDER.indexOf(tier)
  const currentIdx = TIER_ORDER.indexOf(current)
  if (idx < currentIdx) return "done"
  if (idx === currentIdx) return "current"
  return "locked"
}

export function TierLadder() {
  const { data, isLoading, error } = useEndpoint("/loans/tier", getLoanTier)
  const currentTier = data?.tier

  return (
    <section className="space-y-3">
      <h2 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        {currentTier
          ? `TIER LADDER · YOU ARE ON ${currentTier}`
          : "TIER LADDER"}
      </h2>
      {error && !data ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.name}
              visual={tier}
              isLoading={isLoading && !data}
              state={stateFor(tier.tier, currentTier)}
              limit={
                tier.tier === currentTier && data?.maxExposure
                  ? formatPriceCompact(data.maxExposure)
                  : tier.limitFallback
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}

function TierCard({
  visual,
  state,
  limit,
  isLoading,
}: {
  visual: TierVisual
  state: "done" | "current" | "locked"
  limit: string
  isLoading: boolean
}) {
  const current = state === "current"
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
        <div className={cn("font-display text-lg font-semibold", NAME_COLOR[visual.nameTone])}>
          {visual.name}
        </div>
        {current ? (
          <Badge variant="lime" className="h-6 px-2.5 text-[11px]">
            Current
          </Badge>
        ) : (
          <span className="text-right text-[11px] text-text-3">
            {state === "done" ? "Cleared" : "Locked"}
          </span>
        )}
      </div>

      {isLoading ? (
        <Skeleton className="mt-4 h-8 w-20" />
      ) : (
        <div className="mt-4 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
          {limit}
        </div>
      )}
      <div className="mt-1 text-xs text-text-3">limit · {visual.apr}</div>

      {state === "locked" && (
        <div className="mt-4 space-y-1.5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "20%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block h-full rounded-full bg-lime-500"
            />
          </div>
          <div className="text-[11px] text-text-3">
            Build consistency to unlock
          </div>
        </div>
      )}
    </div>
  )
}
