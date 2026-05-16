import type { Metadata } from "next"

import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { AvailableBalanceCard } from "@/components/dashboard/wallet/available-balance-card"
import { MoneyInOutChart } from "@/components/dashboard/wallet/money-in-out-chart"
import { SendToCard } from "@/components/dashboard/wallet/send-to-card"
import { VirtualCardPreview } from "@/components/dashboard/wallet/virtual-card-preview"
import { WalletActivityTable } from "@/components/dashboard/wallet/wallet-activity-table"
import { WalletBankCard } from "@/components/dashboard/wallet/wallet-bank-card"
import { WalletCopilotCard } from "@/components/dashboard/wallet/wallet-copilot-card"
import { WalletHeaderActions } from "@/components/dashboard/wallet/wallet-header-actions"
import { WalletSubBalances } from "@/components/dashboard/wallet/wallet-sub-balances"

export const metadata: Metadata = { title: "Wallet" }

export default function WalletPage() {
  return (
    <DashboardPage
      title="Wallet"
      meta="Trace bank · ADAEZE OKAFOR · NDIC-insured up to ₦5,000,000"
      actions={<WalletHeaderActions />}
    >
      <div className="space-y-6">
        <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <WalletBankCard />
          <AvailableBalanceCard />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <WalletSubBalances />
          <VirtualCardPreview />
          <SendToCard />
        </section>

        <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
          <MoneyInOutChart />
          <WalletCopilotCard />
        </section>

        <WalletActivityTable />
      </div>
    </DashboardPage>
  )
}
