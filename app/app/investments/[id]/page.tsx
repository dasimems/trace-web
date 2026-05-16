"use client"

import { use, useState } from "react"
import { Check, GitCompare, Star } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DetailHeader } from "@/components/dashboard/detail/detail-header"
import { DetailRail } from "@/components/dashboard/detail/detail-rail"
import { WhyCard, type WhyReason } from "@/components/dashboard/detail/why-card"
import { NavPerUnitCard } from "@/components/dashboard/investments/detail/nav-card"
import { PerformanceChart } from "@/components/dashboard/investments/detail/performance-chart"
import { ProjectionChart } from "@/components/dashboard/investments/projection-chart"
import { RecentDistributions } from "@/components/dashboard/investments/detail/recent-distributions"
import { RiskHonestRead } from "@/components/dashboard/investments/detail/risk-honest-read"
import { SectorAllocation } from "@/components/dashboard/investments/detail/sector-allocation"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  allocateInvestment,
  getInvestmentProducts,
  getSafeToInvest,
  type TInvestmentProduct,
} from "@/api/investments"
import { constructErrorMessage } from "@/api/functions"
import { formatNairaCompact, formatNairaWhole } from "@/lib/money"

function humanize(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function reasonsFor(product: TInvestmentProduct): WhyReason[] {
  const returnPct = (product.expectedReturnBps / 100).toFixed(1)
  const tenor = product.tenorDays ? `${product.tenorDays}-day lock-up` : "Open-ended"
  return [
    {
      label: "Risk profile",
      percent: 92,
      description: `${humanize(product.riskLevel)} risk inside Trace's recommended envelope.`,
    },
    {
      label: "Expected return",
      percent: 88,
      description: `${returnPct}% p.a. — sized to your typical cash buffer.`,
    },
    {
      label: "Liquidity",
      percent: 82,
      description: tenor,
    },
    {
      label: "Provider trust",
      percent: 78,
      description: `${product.provider} · ${humanize(product.type)}`,
    },
  ]
}

export default function InvestmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const productsQuery = useEndpoint("/investments/products", getInvestmentProducts)
  const safeQuery = useEndpoint("/investments/safe-to-invest", getSafeToInvest)
  const product = productsQuery.data?.find((p) => p.id === id)

  const [isAllocating, setIsAllocating] = useState(false)
  const investAmount = safeQuery.data?.suggested ?? product?.minAmount ?? 25_000_00

  async function handleAllocate() {
    if (!product) return
    setIsAllocating(true)
    try {
      await allocateInvestment({ productId: product.id, amount: investAmount })
      toast.success(
        `Allocated ${formatNairaCompact(investAmount)} to ${product.name}.`,
      )
    } catch (error) {
      const message = constructErrorMessage(
        error as TApiErrorResponseType,
        "Couldn't allocate to that product.",
      )
      toast.error(message)
    } finally {
      setIsAllocating(false)
    }
  }

  if (!productsQuery.data && productsQuery.isLoading) {
    return <DetailSkeleton />
  }

  if (!product) {
    return (
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Product not found.
        </h1>
        <p className="mt-2 text-text-3">
          {productsQuery.error ?? "We couldn't find this investment."}
        </p>
      </div>
    )
  }

  const returnLabel = `${(product.expectedReturnBps / 100).toFixed(1)}%`
  const headerStats = [
    { label: "Expected return", value: returnLabel, tone: "good" as const },
    { label: "Risk", value: humanize(product.riskLevel), tone: "default" as const },
    { label: "Min ticket", value: formatNairaCompact(product.minAmount), tone: "default" as const },
    {
      label: "Lock-up",
      value: product.tenorDays ? `${product.tenorDays} days` : "Flexible",
      tone: "default" as const,
    },
    { label: "Provider", value: product.provider, tone: "default" as const },
    { label: "Type", value: humanize(product.type), tone: "default" as const },
  ]

  const projectedValue =
    investAmount +
    Math.round(investAmount * (product.expectedReturnBps / 10000))

  return (
    <>
      <DetailHeader
        backHref="/app/investments"
        breadcrumb={[
          { label: "Investments", href: "/app/investments" },
          { label: humanize(product.type) },
          { label: product.name },
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

      <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_320px_320px] xl:gap-8">
          <main className="min-w-0 space-y-6">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-md border border-info-200 bg-info-50 px-2.5 text-xs font-medium text-info-700 dark:border-info-500/30 dark:bg-info-500/15 dark:text-info-300">
                  {humanize(product.type)}
                </span>
                <span className="inline-flex h-7 items-center rounded-md border border-lime-200 bg-lime-50 px-2.5 text-xs font-medium text-lime-700 dark:border-lime-500/30 dark:bg-lime-500/15 dark:text-lime-300">
                  {humanize(product.riskLevel)} risk
                </span>
                <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-good-200 bg-good-50 px-2.5 text-xs font-medium text-good-700 dark:border-good-500/30 dark:bg-good-500/15 dark:text-good-300">
                  <Check className="size-3" />
                  Trace-vetted
                </span>
              </div>

              <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-text-2">
                {product.description}
              </p>

              <div className="flex items-center gap-3 pt-1">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-good-600 font-mono text-xs font-semibold text-white">
                  {product.provider.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {product.provider}
                  </div>
                  <div className="text-xs text-text-3">
                    {humanize(product.type)} · powered by Trace
                  </div>
                </div>
              </div>
            </header>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <dl className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
                {headerStats.map((stat) => (
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

            <PerformanceChart productId={product.id} />

            <WhyCard
              badgeLabel="Why this fits you"
              caption={product.aiRationale ?? "Aligned with your profile."}
              reasons={reasonsFor(product)}
            />

            <ProjectionChart />
          </main>

          <div className="min-w-0 space-y-6">
            <NavPerUnitCard productId={product.id} />
            <RiskHonestRead product={product} />
            <SectorAllocation productId={product.id} />
            <RecentDistributions productId={product.id} />
          </div>

          <div className="min-w-0">
            <div className="xl:sticky xl:top-6">
              <DetailRail
                label="ALLOCATE"
                hero={formatNairaCompact(projectedValue)}
                heroCaption={`Projected end value · ${returnLabel} p.a.`}
                stats={[
                  { label: "Projected end value", value: formatNairaCompact(projectedValue) },
                  { label: "You invest", value: formatNairaWhole(investAmount) },
                  { label: "Expected return", value: returnLabel },
                  {
                    label: "Lock-up",
                    value: product.tenorDays ? `${product.tenorDays} days` : "Flexible",
                  },
                  { label: "Min ticket", value: formatNairaCompact(product.minAmount) },
                  { label: "Provider", value: product.provider },
                ]}
                copilotInsight={
                  <>
                    {product.aiRationale ??
                      "This allocation sits comfortably inside your safe-to-invest envelope."}
                  </>
                }
                trust="Trace-vetted · investment values can go down as well as up. NDIC does not insure investments."
                primaryLabel={`Invest ${formatNairaWhole(investAmount)}`}
                secondaryLabel="Compare similar"
                footer="Funds debit from your Save sub-balance once you confirm."
                onPrimary={handleAllocate}
                primaryLoading={isAllocating}
                primaryDisabled={isAllocating}
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
