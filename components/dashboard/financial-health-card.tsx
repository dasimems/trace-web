"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GaugeMeter } from "@/components/auth/gauge-meter"
import { getHealthScore, type THealthScore } from "@/api/analysis"
import { useEndpoint } from "@/hooks/use-endpoint"

const LABEL_BY_SCORE = (score: number) => {
  if (score >= 80) return "Strong"
  if (score >= 60) return "Steady"
  if (score >= 40) return "Building"
  return "Fragile"
}

export function FinancialHealthCard() {
  const { data, isLoading, error } = useEndpoint("/analysis/health", getHealthScore)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="col-span-12 rounded-2xl border border-border bg-card p-5 shadow-card sm:col-span-6 lg:col-span-3"
    >
      <div className="flex items-start justify-between">
        <div className="text-sm text-text-3">Financial health</div>
        {data?.status === "fresh" && data?.value && (
          <Badge variant="good" className="h-6 px-2 text-[11px]">
            {data.value.daysOfData}d of data
          </Badge>
        )}
      </div>

      {data?.value ? (
        <ResolvedHealth value={data.value} />
      ) : data?.status === "pending" ? (
        <PendingHealth />
      ) : isLoading || !error ? (
        <HealthSkeleton />
      ) : (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}
    </motion.div>
  )
}

function ResolvedHealth({ value }: { value: THealthScore }) {
  return (
    <div className="mt-3 flex items-end justify-between gap-3">
      <div className="flex-1">
        <div className="font-display text-3xl font-semibold tracking-tight text-foreground">
          {LABEL_BY_SCORE(value.score)}
        </div>
        <div className="mt-1 text-xs text-text-3">{value.segment}</div>
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
      </div>
      <div className="-mb-3 -mr-2 w-[110px] shrink-0">
        <GaugeMeter score={value.score} />
      </div>
    </div>
  )
}

function PendingHealth() {
  return (
    <div className="mt-3 space-y-2">
      <div className="font-display text-3xl font-semibold tracking-tight text-text-3">
        Analyzing…
      </div>
      <p className="text-xs text-text-3">
        We&rsquo;ll update this score once Copilot finishes its first pass.
      </p>
    </div>
  )
}

function HealthSkeleton() {
  return (
    <div className="mt-3 flex items-end justify-between gap-3">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-3 w-32" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-14" />
        </div>
      </div>
      <Skeleton className="h-[80px] w-[110px] rounded-full" />
    </div>
  )
}
