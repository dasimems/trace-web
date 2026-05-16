"use client"

import Link from "next/link"
import { memo, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Bookmark, Check, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { OpportunitySource } from "@/lib/enum"
import {
  saveOpportunity,
  unsaveOpportunity,
  type TOpportunity,
} from "@/api/opportunities"
import { constructErrorMessage } from "@/api/functions"

type Tone = "info" | "good" | "lime" | "warn"

const TYPE_TONE: Record<OpportunitySource, Tone> = {
  [OpportunitySource.INVESTMENT]: "info",
  [OpportunitySource.GRANT]: "good",
  [OpportunitySource.LOAN]: "lime",
}

const TYPE_BADGE: Record<Tone, string> = {
  info: "bg-info-50 text-info-700 border-info-200 dark:bg-info-500/15 dark:text-info-300 dark:border-info-500/30",
  good: "bg-good-50 text-good-700 border-good-200 dark:bg-good-500/15 dark:text-good-300 dark:border-good-500/30",
  lime: "bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-500/15 dark:text-lime-300 dark:border-lime-500/30",
  warn: "bg-warn-50 text-warn-700 border-warn-200 dark:bg-warn-500/15 dark:text-warn-300 dark:border-warn-500/30",
}

function detailHref(opp: TOpportunity): string {
  return `/app/opportunities/${encodeURIComponent(opp.id)}`
}

function OpportunityCardBase({
  opportunity,
  index,
}: {
  opportunity: TOpportunity
  index: number
}) {
  const tone = TYPE_TONE[opportunity.source]
  const [saved, setSaved] = useState(opportunity.isSaved)
  const [savingPending, setSavingPending] = useState(false)

  async function toggleSave() {
    if (savingPending) return
    setSavingPending(true)
    try {
      if (saved) {
        await unsaveOpportunity(opportunity.source, opportunity.id)
      } else {
        await saveOpportunity(opportunity.source, opportunity.id)
      }
      setSaved((v) => !v)
    } catch (error) {
      const message = constructErrorMessage(
        error as TApiErrorResponseType,
        "Couldn't update your saved list.",
      )
      toast.error(message)
    } finally {
      setSavingPending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-lime-300"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium",
            TYPE_BADGE[tone],
          )}
        >
          {opportunity.type}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-xs text-text-2">
            <Sparkles className="size-3.5 text-lime-500" />
            <span className="text-lime-600 dark:text-lime-400 font-semibold tabular-nums">
              {opportunity.matchPercent}
            </span>
            % match
          </span>
          <button
            type="button"
            onClick={toggleSave}
            aria-label={saved ? "Unsave" : "Save"}
            disabled={savingPending}
            className={cn(
              "rounded-full p-1.5 text-text-3 transition-colors hover:text-foreground disabled:opacity-50",
              saved && "text-lime-600 dark:text-lime-400",
            )}
          >
            <Bookmark className={cn("size-4", saved && "fill-current")} />
          </button>
        </div>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
        {opportunity.title}
      </h3>
      <p className="mt-1 text-sm text-text-2">
        {opportunity.aiRationale ?? opportunity.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-4">
        <StatColumn label="Return" value={opportunity.stats.return ?? "—"} />
        <StatColumn label="Risk" value={opportunity.stats.risk ?? "—"} />
        <StatColumn label="Min" value={opportunity.stats.min ?? "—"} />
        <StatColumn label="Tenor" value={opportunity.stats.tenor ?? "—"} />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[10px] font-semibold text-text-2">
            {opportunity.provider.initials}
          </span>
          <span className="truncate text-sm text-foreground">
            {opportunity.provider.name}
          </span>
          {opportunity.provider.verified && (
            <Badge variant="good" className="h-6 gap-1 px-2 text-[11px]">
              <Check className="size-3" />
              Verified
            </Badge>
          )}
        </div>
        <Button
          asChild
          variant="lime-outline"
          size="sm"
          className="h-8 gap-1 rounded-full px-3 text-xs"
        >
          <Link href={detailHref(opportunity)}>
            View <ArrowRight />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

function StatColumn({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-text-3">{label}</div>
      <div className="mt-0.5 font-display text-sm font-semibold tabular-nums text-foreground">
        {value}
      </div>
    </div>
  )
}

export const OpportunityCard = memo(OpportunityCardBase)
