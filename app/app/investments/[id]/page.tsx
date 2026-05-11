import { Check, GitCompare, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DetailHeader } from "@/components/dashboard/detail/detail-header"
import { DetailRail } from "@/components/dashboard/detail/detail-rail"
import { WhyCard, type WhyReason } from "@/components/dashboard/detail/why-card"
import { NavPerUnitCard } from "@/components/dashboard/investments/detail/nav-card"
import { PerformanceChart } from "@/components/dashboard/investments/detail/performance-chart"
import { ProjectionChart } from "@/components/dashboard/investments/projection-chart"
import { RecentDistributions } from "@/components/dashboard/investments/detail/recent-distributions"
import { RiskHonestRead } from "@/components/dashboard/investments/detail/risk-honest-read"
import { SectorAllocation } from "@/components/dashboard/investments/detail/sector-allocation"

const REASONS: ReadonlyArray<WhyReason> = [
  {
    label: "Income alignment",
    percent: 92,
    description: "Distributions land before your busiest week (Fri).",
  },
  {
    label: "Risk profile",
    percent: 88,
    description: "Inside your “balanced” risk envelope · max 12% drawdown modeled.",
  },
  {
    label: "Diversification",
    percent: 84,
    description: "Reduces your MMF concentration from 45% → 31%.",
  },
  {
    label: "Tax efficiency",
    percent: 78,
    description: "Coop returns taxed at 7.5% vs 10% MMF interest.",
  },
]

const HEADER_STATS = [
  { label: "1Y return",  value: "+17.4%",       tone: "good"    },
  { label: "3Y CAGR",    value: "+15.8%",       tone: "good"    },
  { label: "Volatility", value: "Low-Med",      tone: "default" },
  { label: "Min ticket", value: "₦25,000",      tone: "default" },
  { label: "Lock-up",    value: "90 days",      tone: "default" },
  { label: "Fees",       value: "1.5% mgmt + 0%", tone: "default" },
] as const

export default function InvestmentDetailPage() {
  return (
    <>
      <DetailHeader
        backHref="/app/investments"
        breadcrumb={[
          { label: "Investments", href: "/app/investments" },
          { label: "AI picks" },
          { label: "Lagos Trader Coop Fund" },
        ]}
        actions={
          <>
            <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
              <Star /> Watchlist
            </Button>
            <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
              <GitCompare /> Compare
            </Button>
          </>
        }
      />

      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_320px_320px] xl:gap-8">
          <main className="min-w-0 space-y-6">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-md border border-info-200 bg-info-50 px-2.5 text-xs font-medium text-info-700 dark:border-info-500/30 dark:bg-info-500/15 dark:text-info-300">
                  Coop fund
                </span>
                <span className="inline-flex h-7 items-center rounded-md border border-lime-200 bg-lime-50 px-2.5 text-xs font-medium text-lime-700 dark:border-lime-500/30 dark:bg-lime-500/15 dark:text-lime-300">
                  Sector · textiles
                </span>
                <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-good-200 bg-good-50 px-2.5 text-xs font-medium text-good-700 dark:border-good-500/30 dark:bg-good-500/15 dark:text-good-300">
                  <Check className="size-3" />
                  SEC-registered
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-text-2">
                  <span className="size-1.5 rounded-full bg-lime-500" />
                  88% AI confidence
                </span>
              </div>

              <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl">
                Lagos Trader Coop Fund · LTCF-A
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-text-2">
                A pooled credit-and-investment vehicle funded by 4,200 Lagos
                textile traders. Returns track the median revenue growth of
                constituent businesses, paid out monthly net of operating
                reserves.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-good-600 font-mono text-xs font-semibold text-white">
                  LT
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Lagos Trader Coop
                  </div>
                  <div className="text-xs text-text-3">
                    Manager · SEC reg #FM/2021/144 · Audited by KPMG
                  </div>
                </div>
              </div>
            </header>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <dl className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
                {HEADER_STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs text-text-3">{stat.label}</dt>
                    <dd
                      className={`mt-1 font-display text-base font-semibold tabular-nums tracking-tight ${
                        stat.tone === "good"
                          ? "text-good-600 dark:text-good-400"
                          : "text-foreground"
                      }`}
                    >
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <PerformanceChart />

            <WhyCard
              badgeLabel="Why this fits you"
              caption="Same-sector traders averaged 17.4% last year"
              reasons={REASONS}
            />

            <ProjectionChart />
          </main>

          <div className="min-w-0 space-y-6">
            <NavPerUnitCard />
            <RiskHonestRead />
            <SectorAllocation />
            <RecentDistributions />
          </div>

          <div className="min-w-0">
            <div className="xl:sticky xl:top-6">
              <DetailRail
                label="ALLOCATE"
                hero="₦70,440"
                heroCaption="+₦10,440 over 12 months · median"
                stats={[
                  { label: "Projected end value", value: "₦70,440" },
                  { label: "You invest",  value: "₦60,000"   },
                  { label: "Hold period", value: "12 months" },
                  { label: "Lock-up",     value: "90 days"   },
                  { label: "Mgmt fee",    value: "1.5% p.a." },
                  { label: "Funded from", value: "Save · ₦128,790" },
                ]}
                copilotInsight={
                  <>
                    Allocating{" "}
                    <span className="font-semibold text-foreground">₦60k</span>{" "}
                    drops your MMF concentration from{" "}
                    <span className="font-semibold text-foreground">45% → 31%</span>{" "}
                    — your portfolio gets meaningfully more resilient without
                    changing your safe-to-spend.
                  </>
                }
                trust="SEC-registered · audited monthly · NDIC does not insure investments."
                primaryLabel="Invest ₦60,000 →"
                secondaryLabel="Auto-allocate from Save"
                footer="Funds debit from your Save sub-balance. 90-day lock-up applies — no surprises."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
