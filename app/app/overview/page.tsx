import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { FinancialHealthCard } from "@/components/dashboard/financial-health-card"
import { MetricTrendCard } from "@/components/dashboard/metric-trend-card"
import { OverviewBankCard } from "@/components/dashboard/overview-bank-card"
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

const NET_CASH_TREND      = [0.10, 0.18, 0.30, 0.32, 0.46, 0.55, 0.68, 0.82] as const
const SPEND_TREND         = [0.20, 0.30, 0.42, 0.40, 0.55, 0.62, 0.72, 0.80] as const
const SAFE_TO_SAVE_TREND  = [0.05, 0.12, 0.22, 0.28, 0.40, 0.55, 0.68, 0.80] as const

export default function OverviewPage() {
  return (
    <DashboardPage
      title="Good evening, Adaeze"
      meta="Friday, 9 May · 4 new insights from Copilot today"
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
          <MetricTrendCard
            label="Net cash this month"
            value="₦487,210"
            caption="vs ₦413k last month"
            pillLabel="+18%"
            pillTone="lime"
            series={NET_CASH_TREND}
            delay={0.05}
          />
          <MetricTrendCard
            label="Spending"
            value="₦312,544"
            caption="₦42k over recommended"
            pillLabel="+9%"
            pillTone="warn"
            series={SPEND_TREND}
            delay={0.1}
          />
          <MetricTrendCard
            label="Safe-to-save"
            value="₦42,000"
            caption="AI-projected next 30 days"
            pillLabel="92% confident"
            pillTone="good"
            series={SAFE_TO_SAVE_TREND}
            delay={0.15}
          />
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
