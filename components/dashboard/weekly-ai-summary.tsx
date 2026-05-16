"use client"

import { motion } from "motion/react"
import { ArrowRight, AlertCircle, Check, Info, Sparkles, TriangleAlert } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getWeeklySummary, type TInsightTone } from "@/api/analysis"

const ICON_BY_TONE: Record<TInsightTone, LucideIcon> = {
  good: Check,
  lime: Sparkles,
  info: Info,
  warn: AlertCircle,
  bad: TriangleAlert,
}

const BULLET_BG: Record<TInsightTone, string> = {
  good: "bg-good-100 text-good-700 dark:bg-good-500/20 dark:text-good-300",
  lime: "bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300",
  info: "bg-info-100 text-info-700 dark:bg-info-500/20 dark:text-info-300",
  warn: "bg-warn-100 text-warn-700 dark:bg-warn-500/20 dark:text-warn-300",
  bad: "bg-bad-100 text-bad-700 dark:bg-bad-500/20 dark:text-bad-300",
}

export function WeeklyAiSummary() {
  const { data, isLoading, error } = useEndpoint(
    "/analysis/summary",
    getWeeklySummary,
  )

  const updatedAgo =
    data?.lastUpdated &&
    formatDistanceToNow(new Date(data.lastUpdated), { addSuffix: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
      className="rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="ai-badge">Weekly AI summary</span>
        {updatedAgo && (
          <span className="font-mono text-[11px] tracking-wide text-text-3">
            Generated {updatedAgo}
          </span>
        )}
      </div>

      {data?.value && data.value.bullets.length > 0 ? (
        <ResolvedSummary
          bullets={data.value.bullets}
          aiGenerated={data.value.aiGenerated}
        />
      ) : isLoading ? (
        <SummarySkeleton />
      ) : error ? (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      ) : (
        <EmptySummary />
      )}
    </motion.div>
  )
}

function ResolvedSummary({
  bullets,
  aiGenerated,
}: {
  bullets: { tone: TInsightTone; text: string }[]
  aiGenerated: boolean
}) {
  const headline = bullets[0]?.text ?? "Your finances at a glance."
  return (
    <>
      <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
        {headline}
      </h3>

      <ul className="mt-5 space-y-3">
        {bullets.slice(1).map((bullet, i) => {
          const Icon = ICON_BY_TONE[bullet.tone]
          return (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  BULLET_BG[bullet.tone],
                )}
              >
                <Icon className="size-3" />
              </span>
              <span className="text-text-2">{bullet.text}</span>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <Button size="lg" className="h-9 rounded-full px-4 shadow-primary">
          Talk to Copilot <ArrowRight />
        </Button>
        {!aiGenerated && (
          <span className="text-xs text-text-3">
            Heuristic mode · enable Anthropic key for richer phrasing
          </span>
        )}
      </div>
    </>
  )
}

function EmptySummary() {
  return (
    <p className="mt-4 text-sm leading-relaxed text-text-3">No data yet.</p>
  )
}

function SummarySkeleton() {
  return (
    <>
      <Skeleton className="mt-4 h-8 w-3/4" />
      <ul className="mt-5 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </li>
        ))}
      </ul>
    </>
  )
}
