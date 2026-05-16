"use client"

import { use, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, Check, Share2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DetailHeader } from "@/components/dashboard/detail/detail-header"
import { DetailRail } from "@/components/dashboard/detail/detail-rail"
import { WhyCard, type WhyReason } from "@/components/dashboard/detail/why-card"
import { AffordabilityForecast } from "@/components/dashboard/opportunities/detail/affordability-forecast"
import { OpportunitySimulator } from "@/components/dashboard/opportunities/detail/opportunity-simulator"
import {
  CommonQuestionsCard,
  DocumentsCard,
} from "@/components/dashboard/opportunities/detail/documents-and-faq"
import {
  CostBreakdownCard,
  EstimatedForYouCard,
} from "@/components/dashboard/opportunities/detail/loan-summary"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  getOpportunity,
  saveOpportunity,
  unsaveOpportunity,
  type TOpportunity,
} from "@/api/opportunities"
import { OpportunitySource } from "@/lib/enum"
import { constructErrorMessage } from "@/api/functions"

function parseId(raw: string): { source: OpportunitySource; id: string } | null {
  const decoded = decodeURIComponent(raw)
  const idx = decoded.indexOf(":")
  if (idx === -1) return null
  const sourceCandidate = decoded.slice(0, idx).toUpperCase() as OpportunitySource
  if (!Object.values(OpportunitySource).includes(sourceCandidate)) return null
  return { source: sourceCandidate, id: decoded }
}

function reasonsFor(opp: TOpportunity): WhyReason[] {
  return [
    {
      label: "Cash-flow alignment",
      percent: Math.min(99, opp.matchPercent + 4),
      description:
        opp.aiRationale ??
        "Distributions/repayments line up with your strongest weekly income window.",
    },
    {
      label: "Risk fit",
      percent: Math.max(40, opp.matchPercent - 4),
      description: opp.stats.risk
        ? `Risk profile: ${opp.stats.risk}`
        : "Inside your recommended risk envelope.",
    },
    {
      label: "Tier match",
      percent: opp.matchPercent,
      description: `${opp.source.toLowerCase()} · ${opp.type}`,
    },
    {
      label: "Provider trust",
      percent: opp.provider.verified ? 92 : 70,
      description: opp.provider.verified
        ? `${opp.provider.name} · verified provider`
        : `${opp.provider.name}`,
    },
  ]
}

function ctaLabelFor(source: OpportunitySource): string {
  switch (source) {
    case OpportunitySource.LOAN:
      return "Apply now"
    case OpportunitySource.INVESTMENT:
      return "Allocate"
    case OpportunitySource.GRANT:
      return "Express interest"
  }
}

export default function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: rawId } = use(params)
  const router = useRouter()
  const parsed = useMemo(() => parseId(rawId), [rawId])
  const cacheKey = parsed ? `/opportunities/${parsed.source}/${parsed.id}` : null

  const { data, isLoading, error } = useEndpoint(cacheKey, () =>
    getOpportunity(parsed!.source, parsed!.id),
  )
  const [saved, setSaved] = useState<boolean | null>(null)
  const [savingPending, setSavingPending] = useState(false)

  if (!parsed) {
    return (
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Opportunity not found.
        </h1>
      </div>
    )
  }

  if (!data && isLoading) {
    return <DetailSkeleton />
  }
  if (!data) {
    return (
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Opportunity not found.
        </h1>
        <p className="mt-2 text-text-3">{error ?? "Please try again."}</p>
      </div>
    )
  }

  const isSaved = saved ?? data.isSaved

  async function toggleSave() {
    if (savingPending) return
    setSavingPending(true)
    try {
      if (isSaved) {
        await unsaveOpportunity(parsed!.source, parsed!.id)
        setSaved(false)
      } else {
        await saveOpportunity(parsed!.source, parsed!.id)
        setSaved(true)
      }
    } catch (e) {
      const message = constructErrorMessage(
        e as TApiErrorResponseType,
        "Couldn't update your saved list.",
      )
      toast.error(message)
    } finally {
      setSavingPending(false)
    }
  }

  function handlePrimary() {
    if (parsed!.source === OpportunitySource.LOAN) {
      router.push("/app/loans")
    } else if (parsed!.source === OpportunitySource.INVESTMENT) {
      router.push("/app/investments")
    } else {
      toast.info("We'll reach out within 1 business day.")
    }
  }

  return (
    <>
      <DetailHeader
        backHref="/app/opportunities"
        breadcrumb={[
          { label: "Opportunities", href: "/app/opportunities" },
          { label: data.type },
          { label: data.title },
        ]}
        actions={
          <>
            <Button
              variant="outline"
              size="lg"
              onClick={toggleSave}
              disabled={savingPending}
              className="h-9 gap-2 rounded-full"
            >
              <Bookmark className={isSaved ? "fill-current" : ""} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
              <Share2 /> Share
            </Button>
          </>
        }
      />

      <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_320px_320px] xl:gap-8">
          <main className="min-w-0 space-y-6">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-md border border-lime-200 bg-lime-50 px-2.5 text-xs font-medium text-lime-700 dark:border-lime-500/30 dark:bg-lime-500/15 dark:text-lime-300">
                  {data.source}
                </span>
                <span className="inline-flex h-7 items-center rounded-md border border-warn-200 bg-warn-50 px-2.5 text-xs font-medium text-warn-700 dark:border-warn-500/30 dark:bg-warn-500/15 dark:text-warn-300">
                  {data.type}
                </span>
                {data.provider.verified && (
                  <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-good-200 bg-good-50 px-2.5 text-xs font-medium text-good-700 dark:border-good-500/30 dark:bg-good-500/15 dark:text-good-300">
                    <Check className="size-3" />
                    Verified provider
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs text-text-2">
                  <span className="size-1.5 rounded-full bg-lime-500" />
                  {data.matchPercent}% AI match
                </span>
              </div>

              <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                {data.title}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-text-2">
                {data.description}
              </p>

              <div className="flex items-center gap-3 pt-1">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 font-mono text-xs font-semibold text-white">
                  {data.provider.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {data.provider.name}
                  </div>
                  <div className="text-xs text-text-3">
                    {data.source.toLowerCase()} provider
                  </div>
                </div>
              </div>
            </header>

            <WhyCard
              badgeLabel="Why Copilot picked this"
              caption={data.aiRationale ?? "Ranked by your behaviour, not your demographics."}
              reasons={reasonsFor(data)}
            />

            <OpportunitySimulator opportunity={data} />
            <AffordabilityForecast />
          </main>

          <div className="min-w-0 space-y-6">
            <EstimatedForYouCard opportunity={data} />
            <CostBreakdownCard opportunity={data} />
            <DocumentsCard opportunity={data} />
            <CommonQuestionsCard opportunity={data} />
          </div>

          <div className="min-w-0">
            <div className="xl:sticky xl:top-6">
              <DetailRail
                label={ctaLabelFor(data.source).toUpperCase()}
                hero={data.stats.return ?? data.stats.min ?? "—"}
                heroCaption={data.aiRationale ?? data.description}
                stats={[
                  { label: "Return", value: data.stats.return ?? "—" },
                  { label: "Risk", value: data.stats.risk ?? "—" },
                  { label: "Min", value: data.stats.min ?? "—" },
                  { label: "Tenor", value: data.stats.tenor ?? "—" },
                  { label: "Provider", value: data.provider.name },
                ]}
                copilotInsight={
                  <>{data.aiRationale ?? data.description}</>
                }
                trust="Trace-vetted. We never sell your data."
                primaryLabel={ctaLabelFor(data.source)}
                secondaryLabel="Talk to Copilot first"
                footer="Submitting won't impact your trust score."
                onPrimary={handlePrimary}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DetailSkeleton() {
  return (
    <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="mt-3 h-4 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-6 h-32 w-full" />
    </div>
  )
}
