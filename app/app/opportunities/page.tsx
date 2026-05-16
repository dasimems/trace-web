"use client"

import { useMemo, useState } from "react"
import { Bookmark, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import {
  CategoryFilterPills,
  type OpportunityFilter,
} from "@/components/dashboard/opportunities/category-filter-pills"
import { OpportunityCard } from "@/components/dashboard/opportunities/opportunity-card"
import { TopMatchFeature } from "@/components/dashboard/opportunities/top-match-feature"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getOpportunities, type TOpportunity } from "@/api/opportunities"

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState<OpportunityFilter>("ALL")
  const { data, isLoading, error } = useEndpoint("/opportunities", () =>
    getOpportunities(),
  )

  const filtered = useMemo<TOpportunity[]>(() => {
    if (!data) return []
    if (filter === "ALL") return data
    return data.filter((o) => o.source === filter)
  }, [data, filter])

  const top = filtered[0] ?? null
  const rest = filtered.slice(1)
  const savedCount = data?.filter((o) => o.isSaved).length ?? 0

  return (
    <DashboardPage
      title="Opportunity marketplace"
      meta={
        data
          ? `${data.length} fresh matches · ranked by Copilot`
          : "Ranked by Copilot using your behaviour, not your demographics"
      }
      actions={
        <>
          <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
            <SlidersHorizontal /> Filters
          </Button>
          <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
            <Bookmark /> Saved ({savedCount})
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <CategoryFilterPills active={filter} onChange={setFilter} />

        <TopMatchFeature opportunity={top} isLoading={isLoading && !data} />

        <section className="space-y-4">
          <h2 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
            MORE MATCHES FOR YOU
          </h2>
          {rest.length === 0 ? (
            isLoading && !data ? (
              <MatchesSkeleton />
            ) : error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : data && data.length > 0 ? (
              <p className="text-sm text-text-3">
                That&rsquo;s every match for the {filter === "ALL" ? "current view" : `${filter} filter`} right now.
              </p>
            ) : (
              <p className="text-sm text-text-3">
                No opportunities yet — keep transacting to unlock matches.
              </p>
            )
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((opp, i) => (
                <OpportunityCard
                  key={`${opp.source}-${opp.id}`}
                  opportunity={opp}
                  index={i}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardPage>
  )
}

function MatchesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <div className="flex items-start justify-between">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="mt-4 h-5 w-3/4" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-4 h-12 w-full" />
        </div>
      ))}
    </div>
  )
}
