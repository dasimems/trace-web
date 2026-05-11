import { Bookmark, Check, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CopilotSays } from "@/components/dashboard/detail/copilot-says"
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

const REASONS: ReadonlyArray<WhyReason> = [
  {
    label: "Cash-flow alignment",
    percent: 96,
    description: "Your daily takings cover the daily-amortizing repayment 6.4× over.",
  },
  {
    label: "Sector resilience",
    percent: 92,
    description: "Lagos textiles · low default cohort (1.8% in last 12 mo).",
  },
  {
    label: "Trust & tier",
    percent: 88,
    description: "Gold tier · 9 weeks stable income · score 82.",
  },
  {
    label: "Repayment cadence fit",
    percent: 84,
    description: "Mon–Sat amortization avoids your softest income day (Sun).",
  },
]

export default function OpportunityDetailPage() {
  return (
    <>
      <DetailHeader
        backHref="/app/opportunities"
        breadcrumb={[
          { label: "Opportunities", href: "/app/opportunities" },
          { label: "Loans" },
          { label: "SquadCapital · Working Capital" },
        ]}
        actions={
          <>
            <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
              <Bookmark /> Save
            </Button>
            <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
              <Share2 /> Share
            </Button>
          </>
        }
      />

      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_320px_320px] xl:gap-8">
          <main className="min-w-0 space-y-6">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-md border border-lime-200 bg-lime-50 px-2.5 text-xs font-medium text-lime-700 dark:border-lime-500/30 dark:bg-lime-500/15 dark:text-lime-300">
                  Loan
                </span>
                <span className="inline-flex h-7 items-center rounded-md border border-warn-200 bg-warn-50 px-2.5 text-xs font-medium text-warn-700 dark:border-warn-500/30 dark:bg-warn-500/15 dark:text-warn-300">
                  Working capital
                </span>
                <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-good-200 bg-good-50 px-2.5 text-xs font-medium text-good-700 dark:border-good-500/30 dark:bg-good-500/15 dark:text-good-300">
                  <Check className="size-3" />
                  Verified provider
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-text-2">
                  <span className="size-1.5 rounded-full bg-lime-500" />
                  96% AI match
                </span>
              </div>

              <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl">
                SquadCapital · Working Capital Loan
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-text-2">
                A daily-amortizing line of credit built for daily-cash businesses.
                Repayments are auto-debited from your Trace wallet on settlement,
                sized to the buffer Copilot sees in your cash flow.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 font-mono text-xs font-semibold text-white">
                  SQ
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    SquadCapital
                  </div>
                  <div className="text-xs text-text-3">
                    Lender · CBN-licensed · 4.7★ (1,224 borrowers)
                  </div>
                </div>
              </div>
            </header>

            <WhyCard
              badgeLabel="Why Copilot picked this"
              caption="Trained on your last 90 days · auditable"
              quote={`"Your trading days line up with the daily amortization plan. Every weekday in the last 9 weeks, your Mon-PM balance covered the proposed daily debit by at least 2.4×."`}
              reasons={REASONS}
            />

            <OpportunitySimulator />
            <AffordabilityForecast />
          </main>

          <div className="min-w-0 space-y-6">
            <EstimatedForYouCard />
            <CostBreakdownCard />
            <DocumentsCard />
            <CommonQuestionsCard />
          </div>

          <div className="min-w-0">
            <div className="xl:sticky xl:top-6">
              <DetailRail
                label="APPLY"
                hero="₦1,200,000"
                heroCaption="net of ₦12,000 origination"
                stats={[
                  { label: "You'll receive", value: "₦1,200,000" },
                  { label: "Daily repayment", value: "₦7,548" },
                  { label: "Tenor", value: "6 months · 156 debits" },
                  { label: "First debit", value: "Mon, 11 May · 6:00pm" },
                  { label: "Disburse to", value: "Trace wallet · 8024 567 1925" },
                ]}
                copilotInsight={
                  <>
                    Take{" "}
                    <span className="font-semibold text-foreground">₦1.2M</span>{" "}
                    (not the full ₦1.8M) — keeps your trust score above 80 and
                    lifts you to{" "}
                    <span className="font-semibold text-foreground">Platinum</span>{" "}
                    3 weeks sooner.
                  </>
                }
                trust="CBN-licensed · NDPR-secured. Your data is never sold."
                primaryLabel="Apply in 4 minutes →"
                secondaryLabel="Talk to Copilot first"
                footer="Submitting won't impact your trust score. Approval decision in ~4 minutes — no callbacks, no paperwork."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
