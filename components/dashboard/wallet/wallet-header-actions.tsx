"use client"

import { Download, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import useWalletActionsStore from "@/stores/wallet-actions-store"

// Header for the wallet page. The action sheets themselves are mounted once at
// the dashboard layout level (see DashboardStreams), so any button anywhere in
// /app/* can call into the wallet-actions store without re-mounting them.
export function WalletHeaderActions() {
  const openFund = useWalletActionsStore((s) => s.openFund)

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        disabled
        title="Statement export isn't available yet"
        className="h-9 gap-2 rounded-full"
      >
        <Download /> Statement
      </Button>
      <Button
        size="lg"
        className="h-9 gap-2 rounded-full px-4 shadow-primary"
        onClick={openFund}
      >
        <Plus /> Fund wallet
      </Button>
    </>
  )
}
