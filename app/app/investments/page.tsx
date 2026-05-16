"use client"

import { ChevronDown } from "lucide-react"

import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { Skeleton } from "@/components/ui/skeleton"
import { InvestmentPickCard } from "@/components/dashboard/investments/investment-pick-card"
import { PortfolioCard } from "@/components/dashboard/investments/portfolio-card"
import { ProjectionChart } from "@/components/dashboard/investments/projection-chart"
import { SafeToInvestCard } from "@/components/dashboard/investments/safe-to-invest-card"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getInvestmentProducts } from "@/api/investments"

export default function InvestmentsPage() {
  const { data, isLoading, error } = useEndpoint(
    "/investments/products",
    getInvestmentProducts,
  )
  const products = data ?? []

  return (
    <DashboardPage
      title="Investment recommendations"
      meta="Tuned to your income rhythm and risk appetite — not generic ads."
      actions={
        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Risk profile: Balanced
          <ChevronDown className="size-3.5 text-text-3" />
        </button>
      }
    >
      <div className="space-y-6">
        <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <PortfolioCard />
          <SafeToInvestCard />
        </section>

        <ProjectionChart />

        <section className="space-y-4">
          <h2 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
            AI-PICKED FOR YOU
          </h2>
          {products.length === 0 ? (
            isLoading ? (
              <PicksSkeleton />
            ) : error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : (
              <p className="text-sm text-text-3">
                No investment products available right now.
              </p>
            )
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.slice(0, 6).map((product, i) => (
                <InvestmentPickCard
                  key={product.id}
                  product={product}
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

function PicksSkeleton() {
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
