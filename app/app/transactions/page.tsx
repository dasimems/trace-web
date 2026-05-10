import { Download, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { MetricTrendCard } from "@/components/dashboard/metric-trend-card"
import { CategoryTrendChart } from "@/components/dashboard/transactions/category-trend-chart"
import { RecentActivityTable } from "@/components/dashboard/transactions/recent-activity-table"
import { SpendingHeatmap } from "@/components/dashboard/transactions/spending-heatmap"

const INFLOW_TREND     = [0.32, 0.36, 0.42, 0.45, 0.55, 0.62, 0.78, 0.84] as const
const OUTFLOW_TREND    = [0.20, 0.28, 0.36, 0.40, 0.52, 0.58, 0.65, 0.72] as const
const RECURRING_TREND  = [0.08, 0.18, 0.30, 0.42, 0.55, 0.66, 0.78, 0.88] as const
const ANOMALIES_TREND  = [0.42, 0.30, 0.55, 0.38, 0.62, 0.40, 0.30, 0.36] as const

export default function TransactionsPage() {
  return (
    <DashboardPage
      title="Transaction intelligence"
      meta="4,217 transactions across 2 accounts · auto-tagged by Copilot"
      actions={
        <>
          <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
            <SlidersHorizontal /> Filters
          </Button>
          <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
            <Download /> Export CSV
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <section className="grid grid-cols-12 gap-4">
          <MetricTrendCard
            label="Inflow this month"
            value="₦612,400"
            caption="14 sources"
            pillLabel="+18%"
            pillTone="good"
            trendTone="lime"
            series={INFLOW_TREND}
          />
          <MetricTrendCard
            label="Outflow this month"
            value="₦312,544"
            caption="38 categories"
            pillLabel="+9%"
            pillTone="good"
            trendTone="warn"
            series={OUTFLOW_TREND}
            delay={0.05}
          />
          <MetricTrendCard
            label="Recurring detected"
            value="7"
            caption="₦46,200/mo committed"
            pillLabel="2 new"
            pillTone="good"
            trendTone="info"
            series={RECURRING_TREND}
            delay={0.1}
          />
          <MetricTrendCard
            label="Anomalies flagged"
            value="3"
            caption="2 reviewed · 1 pending"
            pillLabel="Live"
            pillTone="good"
            trendTone="bad"
            series={ANOMALIES_TREND}
            delay={0.15}
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <SpendingHeatmap />
          <CategoryTrendChart />
        </section>

        <RecentActivityTable />
      </div>
    </DashboardPage>
  )
}
