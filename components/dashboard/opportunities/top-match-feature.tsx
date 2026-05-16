"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { TOpportunity } from "@/api/opportunities"

type TopMatchFeatureProps = {
  opportunity: TOpportunity | null
  isLoading?: boolean
}

function detailHref(opp: TOpportunity): string {
  return `/app/opportunities/${encodeURIComponent(opp.id)}`
}

export function TopMatchFeature({
  opportunity,
  isLoading,
}: TopMatchFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-3xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5 sm:p-7"
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
        <div>
          <span className="ai-badge">
            Top match{opportunity ? ` · ${opportunity.matchPercent}%` : ""}
          </span>

          {opportunity ? (
            <>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {opportunity.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-2">
                {opportunity.aiRationale ?? opportunity.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                <Stat label="Return" value={opportunity.stats.return ?? "—"} />
                <Stat label="Risk" value={opportunity.stats.risk ?? "—"} />
                <Stat label="Min" value={opportunity.stats.min ?? "—"} />
                <Stat label="Tenor" value={opportunity.stats.tenor ?? "—"} />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-10 rounded-full px-5 shadow-primary">
                  <Link href={detailHref(opportunity)}>
                    View details <ArrowRight />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-10 rounded-full px-5">
                  Compare
                </Button>
              </div>
            </>
          ) : isLoading ? (
            <>
              <Skeleton className="mt-4 h-9 w-2/3" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </>
          ) : (
            <p className="mt-4 text-sm text-text-2">
              No opportunities yet — keep transacting and Copilot will surface
              matches here.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm">
          <div className="text-sm font-medium text-foreground">
            Why Copilot picked this
          </div>
          {opportunity ? (
            <p className="mt-3 text-sm leading-relaxed text-text-2">
              {opportunity.aiRationale ?? opportunity.description}
            </p>
          ) : (
            <Skeleton className="mt-4 h-20 w-full" />
          )}
        </div>
      </div>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-text-3">{label}</div>
      <div className="mt-1 font-display text-xl font-semibold tabular-nums tracking-tight text-foreground">
        {value}
      </div>
    </div>
  )
}
