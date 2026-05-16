import type { Metadata } from "next"
import { Download, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { CategoryTrendChart } from "@/components/dashboard/transactions/category-trend-chart"
import { RecentActivityTable } from "@/components/dashboard/transactions/recent-activity-table"
import { SpendingHeatmap } from "@/components/dashboard/transactions/spending-heatmap"
import { TransactionMetrics } from "@/components/dashboard/transactions/transaction-metrics"

export const metadata: Metadata = { title: "Transactions" }

export default function TransactionsPage() {
  return (
    <DashboardPage
      title="Transaction intelligence"
      meta="Auto-tagged by Copilot · grouped, scored and explained"
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
          <TransactionMetrics />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
          <SpendingHeatmap />
          <CategoryTrendChart />
        </section>

        <RecentActivityTable />
      </div>
    </DashboardPage>
  )
}
