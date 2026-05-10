import { Download, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { AvailableBalanceCard } from "@/components/dashboard/wallet/available-balance-card"
import { MoneyInOutChart } from "@/components/dashboard/wallet/money-in-out-chart"
import { SendToCard } from "@/components/dashboard/wallet/send-to-card"
import { VirtualCardPreview } from "@/components/dashboard/wallet/virtual-card-preview"
import { WalletActivityTable } from "@/components/dashboard/wallet/wallet-activity-table"
import { WalletBankCard } from "@/components/dashboard/wallet/wallet-bank-card"
import { WalletCopilotCard } from "@/components/dashboard/wallet/wallet-copilot-card"
import { WalletSubBalances } from "@/components/dashboard/wallet/wallet-sub-balances"

export default function WalletPage() {
  return (
    <DashboardPage
      title="Wallet"
      meta="Trace bank · ADAEZE OKAFOR · NDIC-insured up to ₦5,000,000"
      actions={
        <>
          <Button
            variant="outline"
            size="lg"
            className="h-9 gap-2 rounded-full"
          >
            <Download /> Statement
          </Button>
          <Button size="lg" className="h-9 gap-2 rounded-full px-4 shadow-primary">
            <Plus /> Fund wallet
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <WalletBankCard />
          <AvailableBalanceCard />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <WalletSubBalances />
          <VirtualCardPreview />
          <SendToCard />
        </section>

        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <MoneyInOutChart />
          <WalletCopilotCard />
        </section>

        <WalletActivityTable />
      </div>
    </DashboardPage>
  )
}
