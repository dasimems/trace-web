import type { Metadata } from "next"

import { ApplyNowButton } from "@/components/dashboard/loans/apply-now-button"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { RepaymentForecast } from "@/components/dashboard/loans/repayment-forecast"
import { RepaymentSimulator } from "@/components/dashboard/loans/repayment-simulator"
import { TierLadder } from "@/components/dashboard/loans/tier-ladder"
import { WhyYouQualify } from "@/components/dashboard/loans/why-you-qualify"

export const metadata: Metadata = { title: "Loans" }

export default function LoansPage() {
  return (
    <DashboardPage
      title="Loan intelligence"
      meta="Everyone gets access. Your tier reflects how you actually behave with money."
      actions={<ApplyNowButton />}
    >
      <div className="space-y-6">
        <TierLadder />

        <section className="grid gap-4 lg:grid-cols-2">
          <WhyYouQualify />
          <RepaymentSimulator />
        </section>

        <RepaymentForecast />
      </div>
    </DashboardPage>
  )
}
