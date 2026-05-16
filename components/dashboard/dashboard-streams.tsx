"use client"

import { useAnalysisStream } from "@/hooks/use-analysis-stream"
import { useWalletStream } from "@/hooks/use-wallet-stream"

// Mounted once inside the dashboard shell. Owns every dashboard-wide SSE
// subscription so individual pages don't open their own connections.
export function DashboardStreams() {
  useWalletStream()
  useAnalysisStream()
  return null
}
