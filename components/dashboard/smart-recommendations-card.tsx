"use client"

import { useMemo } from "react"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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

function hrefFor(rec: TRecommendation): string {
  return HREF_BY_TAG[rec.tag.label] ?? "/app/copilot"
}

export function SmartRecommendationsCard() {
  const { data, isLoading, error } = useEndpoint(
    "/analysis/recommendations",
    getRecommendations,
  )
  const recommendations = useMemo(
    () =>
      (data?.value?.recommendations ?? []).map((rec) => ({
        ...rec,
        href: hrefFor(rec),
      })),
    [data?.value?.recommendations],
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">
          Smart recommendations
        </h3>
        {data?.value && !data.value.aiGenerated && (
          <span className="text-xs text-text-3">Heuristic</span>
        )}
      </div>

      {recommendations.length === 0 ? (
        isLoading ? (
          <RecommendationsSkeleton />
        ) : error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-4 text-sm text-text-3">No data yet.</p>
        )
      ) : (
        <ul className="mt-3 divide-y divide-border">
          {recommendations.map((rec) => (
            <li key={`${rec.trigger}-${rec.title}`}>
              <a
                href={rec.href}
                className="group flex items-center gap-3 py-3 transition-colors hover:text-foreground"
              >
                <Badge variant={rec.tag.tone} className="h-6 px-2.5 text-[11px]">
                  {rec.tag.label}
                </Badge>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {rec.title}
                  </div>
                  <div className="truncate text-xs text-text-3">{rec.detail}</div>
                </div>
                <ArrowRight className="size-4 shrink-0 text-text-3 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RecommendationsSkeleton() {
  return (
    <ul className="mt-3 divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 py-3">
          <Skeleton className="h-6 w-12" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </li>
      ))}
    </ul>
  )
}
