"use client"

import { motion } from "motion/react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getRiskStability, type TInsightTone } from "@/api/analysis"

const FILL: Record<TInsightTone, string> = {
  good: "bg-good-500",
  lime: "bg-lime-500",
  warn: "bg-warn-500",
  info: "bg-info-500",
  bad: "bg-bad-500",
}

const SCORE_TEXT: Record<TInsightTone, string> = {
  good: "text-good-600 dark:text-good-400",
  lime: "text-lime-600 dark:text-lime-400",
  warn: "text-warn-600 dark:text-warn-400",
  info: "text-info-600 dark:text-info-400",
  bad: "text-bad-600 dark:text-bad-400",
}

export function RiskStabilityCard() {
  const { data, isLoading, error } = useEndpoint(
    "/analysis/risk-stability",
    getRiskStability,
  )
  const items = data?.value?.items ?? []

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Risk &amp; stability
      </h3>

      {items.length === 0 ? (
        isLoading ? (
          <RiskSkeleton />
        ) : error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-4 text-sm text-text-3">No data yet.</p>
        )
      ) : (
        <ul className="mt-4 space-y-3.5">
          {items.map((row) => (
            <li key={row.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-2">{row.label}</span>
                <span
                  className={cn(
                    "font-display tabular-nums",
                    SCORE_TEXT[row.tone],
                  )}
                >
                  {row.score}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn("block h-full rounded-full", FILL[row.tone])}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RiskSkeleton() {
  return (
    <ul className="mt-4 space-y-3.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-1.5 w-full" />
        </li>
      ))}
    </ul>
  )
}
