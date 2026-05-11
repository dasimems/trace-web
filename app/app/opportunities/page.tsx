import { Bookmark, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { CategoryFilterPills } from "@/components/dashboard/opportunities/category-filter-pills"
import {
  OpportunityCard,
  type Opportunity,
} from "@/components/dashboard/opportunities/opportunity-card"
import { TopMatchFeature } from "@/components/dashboard/opportunities/top-match-feature"

const MORE_MATCHES: ReadonlyArray<Opportunity> = [
  {
    id: "lagos-trader-coop-fund",
    type: "Investment",
    matchPercent: 91,
    title: "Lagos Trader Coop Fund",
    description: "Same-sector traders averaged 17.4% last year.",
    stats: { return: "18% est.", risk: "Low-Med", min: "₦25k",  tenor: "12 mo"  },
    provider: { initials: "LT", name: "LTC", verified: true },
  },
  {
    id: "afdb-women-in-trade-grant",
    type: "Grant",
    matchPercent: 88,
    title: "AfDB Women in Trade Grant",
    description: "You meet 9/10 eligibility checks.",
    stats: { return: "Non-repayable", risk: "None", min: "—",   tenor: "—"      },
    provider: { initials: "AF", name: "AfDB", verified: true },
  },
  {
    id: "stanbic-ibtc-mmf",
    type: "Investment",
    matchPercent: 84,
    title: "Stanbic IBTC Money Market Fund",
    description: "Park your ₦42k safe-to-save while staying liquid.",
    stats: { return: "13.2% p.a.", risk: "Low", min: "₦5k",     tenor: "Liquid" },
    provider: { initials: "ST", name: "Stanbic", verified: true },
  },
  {
    id: "branch-quick-top-up",
    type: "Loan",
    matchPercent: 78,
    title: "Branch · Quick Top-up",
    description: "Available, but rate is 2× your tier average.",
    stats: { return: "6.5% / mo", risk: "High", min: "—",       tenor: "30 days" },
    provider: { initials: "BR", name: "Branch", verified: false },
  },
  {
    id: "jumia-vendor-boost",
    type: "Partnership",
    matchPercent: 72,
    title: "Jumia Vendor Boost",
    description: "Pairs with your textile inventory.",
    stats: { return: "Volume rebate", risk: "Med", min: "—",    tenor: "—"      },
    provider: { initials: "JU", name: "Jumia", verified: true },
  },
]

export default function OpportunitiesPage() {
  return (
    <DashboardPage
      title="Opportunity marketplace"
      meta="12 fresh matches · ranked by Copilot using your behaviour, not your demographics"
      actions={
        <>
          <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
            <SlidersHorizontal /> 4 filters
          </Button>
          <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
            <Bookmark /> Saved (3)
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <CategoryFilterPills />

        <TopMatchFeature />

        <section className="space-y-4">
          <h2 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
            MORE MATCHES FOR YOU
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {MORE_MATCHES.map((opp, i) => (
              <OpportunityCard key={opp.title} opportunity={opp} index={i} />
            ))}
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}
