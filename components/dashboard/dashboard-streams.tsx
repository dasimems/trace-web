"use client"

import { WalletActionSheets } from "@/components/dashboard/wallet/wallet-action-sheets"
import { useAnalysisStream } from "@/hooks/use-analysis-stream"
import { useWalletStream } from "@/hooks/use-wallet-stream"

// Mounted once inside the dashboard shell. Owns every dashboard-wide SSE
// subscription AND the wallet action sheets so individual pages don't open
// their own connections or remount the sheets.
export function DashboardStreams() {
  useWalletStream()
  useAnalysisStream()
  return <WalletActionSheets />
}
