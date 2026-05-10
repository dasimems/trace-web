import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { RepaymentForecast } from "@/components/dashboard/loans/repayment-forecast"
import { RepaymentSimulator } from "@/components/dashboard/loans/repayment-simulator"
import { TierLadder } from "@/components/dashboard/loans/tier-ladder"
import { WhyYouQualify } from "@/components/dashboard/loans/why-you-qualify"

export default function LoansPage() {
  return (
    <DashboardPage
      title="Loan intelligence"
      meta="Everyone gets access. Your tier reflects how you actually behave with money."
      actions={
        <Button size="lg" className="h-9 gap-2 rounded-full px-4 shadow-primary">
          Apply now <ArrowRight />
        </Button>
      }
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
