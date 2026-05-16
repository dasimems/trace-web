"use client"

import { format } from "date-fns"

import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { FinancialHealthCard } from "@/components/dashboard/financial-health-card"
import { OverviewBankCard } from "@/components/dashboard/overview-bank-card"
import { OverviewTrends } from "@/components/dashboard/overview-trends"
import { RiskStabilityCard } from "@/components/dashboard/risk-stability-card"
import { SmartRecommendationsCard } from "@/components/dashboard/smart-recommendations-card"
import { SpendingBreakdownCard } from "@/components/dashboard/spending-breakdown-card"
import { SubBalancesCard } from "@/components/dashboard/sub-balances-card"
import {
  DateRangePill,
  ExportButton,
} from "@/components/dashboard/topbar-actions"
import { WalletBalanceCard } from "@/components/dashboard/wallet-balance-card"
import { WeeklyAiSummary } from "@/components/dashboard/weekly-ai-summary"
import useUserStore from "@/stores/user-store"

function getGreeting(now: Date): string {
  const hour = now.getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export default function OverviewPage() {
  const firstName = useUserStore((s) => s.userDetails?.firstName)
  const now = new Date()
  const greeting = getGreeting(now)
  const title = firstName ? `${greeting}, ${firstName}` : greeting
  const meta = format(now, "EEEE, d MMM · 'your latest snapshot'")

  return (
    <DashboardPage
      title={title}
      meta={meta}
      actions={
        <>
          <DateRangePill />
          <ExportButton />
        </>
      }
    >
      <div className="space-y-6">
        <section className="grid grid-cols-12 gap-4">
          <OverviewBankCard />
          <WalletBalanceCard />
          <SubBalancesCard />
        </section>

        <section className="grid grid-cols-12 gap-4">
          <FinancialHealthCard />
          <OverviewTrends />
        </section>

        <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
          <CashFlowChart />
          <WeeklyAiSummary />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SpendingBreakdownCard />
          <SmartRecommendationsCard />
          <RiskStabilityCard />
        </section>
      </div>
    </DashboardPage>
  )
}
