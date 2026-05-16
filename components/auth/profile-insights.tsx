"use client"

import { useMemo } from "react"

import { AiInsightCard } from "@/components/auth/ai-insight-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getRecommendations, type TRecommendation } from "@/api/analysis"

const HREF_BY_TAG: Record<string, string> = {
  Save: "/app/wallet",
  Spend: "/app/transactions",
  Grow: "/app/loans",
  Earn: "/app/copilot",
  Invest: "/app/investments",
}

const CTA_BY_TAG: Record<string, string> = {
  Save: "Move to Save",
  Spend: "Review spend",
  Grow: "See offers",
  Earn: "Talk to Copilot",
  Invest: "Browse picks",
}

function hrefFor(rec: TRecommendation): string {
  return HREF_BY_TAG[rec.tag.label] ?? "/app/copilot"
}

function ctaLabelFor(rec: TRecommendation): string {
  return CTA_BY_TAG[rec.tag.label] ?? "Open in Trace"
}

export function ProfileInsights() {
  const { data, isLoading, error } = useEndpoint(
    "/analysis/recommendations",
    getRecommendations,
  )

  const recommendations = useMemo(
    () =>
      (data?.value?.recommendations?.slice(0, 2) ?? []).map((rec) => ({
        ...rec,
        href: hrefFor(rec),
        ctaLabel: ctaLabelFor(rec),
      })),
    [data?.value?.recommendations],
  )

  if (recommendations.length === 0) {
    if (isLoading || data?.status === "pending") {
      return (
        <>
          <InsightSkeleton />
          <InsightSkeleton />
        </>
      )
    }
    if (error) {
      return <p className="text-sm text-destructive">{error}</p>
    }
    return null
  }

  return (
    <>
      {recommendations.map((rec) => (
        <AiInsightCard
          key={`${rec.trigger}-${rec.title}`}
          title={rec.title}
          body={rec.detail}
          ctaLabel={rec.ctaLabel}
          ctaHref={rec.href}
        />
      ))}
    </>
  )
}

function InsightSkeleton() {
  return (
    <div className="rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-4 h-9 w-24 rounded-full" />
    </div>
  )
}
