"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GaugeMeter } from "@/components/auth/gauge-meter"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getHealthScore, type THealthScore } from "@/api/analysis"

const LABEL_BY_SCORE = (score: number) => {
  if (score >= 80) return "Strong"
  if (score >= 60) return "Steady"
  if (score >= 40) return "Building"
  return "Fragile"
}

export function HealthScoreCard() {
  const { data, isLoading, error } = useEndpoint(
    "/analysis/health",
    getHealthScore,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-card p-6 shadow-card"
    >
      {data?.value ? (
        <Resolved value={data.value} />
      ) : data?.status === "pending" ? (
        <Pending />
      ) : isLoading || !error ? (
        <HealthSkeleton />
      ) : (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </motion.div>
  )
}

function Resolved({ value }: { value: THealthScore }) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="text-sm text-text-3">Financial health score</div>
          <div className="mt-2 flex items-center gap-3">
            <span className="font-display text-6xl font-semibold tabular-nums tracking-tight text-foreground">
              {value.score}
            </span>
            <Badge variant={value.tone} className="h-6 px-2.5 text-xs">
              {LABEL_BY_SCORE(value.score)}
            </Badge>
          </div>
          <div className="mt-2 text-sm text-text-3">{value.segment}</div>
          {value.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {value.tags.map((tag) => (
                <Badge
                  key={tag.label}
                  variant={tag.tone}
                  className="h-5 px-2 text-[10px]"
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <GaugeMeter score={value.score} />
      </div>

      {value.subScores.length > 0 && (
        <>
          <div className="my-6 h-px w-full bg-border" />
          <div className="grid gap-6 sm:grid-cols-3">
            {value.subScores.slice(0, 3).map((sub) => (
              <div key={sub.label}>
                <div className="text-sm text-text-3">{sub.label}</div>
                <div className="mt-1 font-display text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                  {sub.score}
                </div>
                <Badge
                  variant={sub.tone}
                  className="mt-2 h-6 px-2.5 text-xs"
                >
                  {sub.reason}
                </Badge>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

function Pending() {
  return (
    <div className="space-y-2">
      <div className="text-sm text-text-3">Financial health score</div>
      <div className="font-display text-4xl font-semibold tracking-tight text-text-3">
        Analyzing…
      </div>
      <p className="text-sm text-text-2">
        Copilot is still scoring your first week of activity. We&apos;ll fill
        this in shortly.
      </p>
    </div>
  )
}

function HealthSkeleton() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-14 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="size-[110px] rounded-full" />
      </div>
      <div className="my-6 h-px w-full bg-border" />
      <div className="grid gap-6 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>
    </>
  )
}
