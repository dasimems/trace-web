import { ChevronDown } from "lucide-react"

import { DashboardPage } from "@/components/dashboard/dashboard-page"
import {
  InvestmentPickCard,
  type InvestmentPick,
} from "@/components/dashboard/investments/investment-pick-card"
import { PortfolioCard } from "@/components/dashboard/investments/portfolio-card"
import { ProjectionChart } from "@/components/dashboard/investments/projection-chart"
import { SafeToInvestCard } from "@/components/dashboard/investments/safe-to-invest-card"

const PICKS: ReadonlyArray<InvestmentPick> = [
  {
    id: "stanbic-ibtc-mmf",
    type: "Money market",
    title: "Stanbic IBTC MMF",
    description: "Your buffer earns ~14× your savings APR.",
    return: "13.2% p.a.",
    risk: "Low",
    confidence: 92,
  },
  {
    id: "lagos-trader-coop-fund",
    type: "Coop · sector",
    title: "Lagos Trader Coop Fund",
    description: "Same-sector traders averaged 17.4% last year.",
    return: "17.4% p.a.",
    risk: "Low-Med",
    confidence: 88,
  },
  {
    id: "fbnquest-eurobond",
    type: "Bond",
    title: "FBNQuest Eurobond",
    description: "USD diversifier — softens NGN moves.",
    return: "8.6% USD",
    risk: "Low",
    confidence: 81,
  },
]

export default function InvestmentsPage() {
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
            AI-PICKED FOR YOU, THIS WEEK
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PICKS.map((pick, i) => (
              <InvestmentPickCard key={pick.title} pick={pick} index={i} />
            ))}
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}
