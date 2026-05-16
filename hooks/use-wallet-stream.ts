"use client"

import { useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { useSse } from "@/hooks/use-sse"
import { formatNairaWhole } from "@/lib/money"
import useWalletStore from "@/stores/wallet-store"

type WalletCreditReceivedPayload = {
  transactionId: string
  reference: string
  amount: number
  balance: number
  senderName: string | null
  senderAccountNumber: string | null
  senderBank: string | null
  remark: string | null
  currency: string
  processedAt: string
}

type WalletEvent<T> = {
  type: string
  payload: T
}

// Subscribes to /wallet/stream and reacts to wallet-scoped events. Mount once
// inside the dashboard shell — multiple mounts would open multiple connections.
export function useWalletStream({ enabled = true } = {}) {
  const queryClient = useQueryClient()

  // Refreshes both the TanStack Query cache (used by /app/wallet) and the
  // Zustand wallet-store (used by the /app/overview balance card). Without the
  // store refresh, the dashboard balance would only update on a hard reload.
  const refreshWalletSurfaces = () => {
    queryClient.invalidateQueries({ queryKey: ["/wallet"] })
    queryClient.invalidateQueries({ queryKey: ["/transactions"] })
    queryClient.invalidateQueries({ queryKey: ["/transactions/metrics"] })
    void useWalletStore.getState().fetchWallet()
  }

  const events = useMemo(
    () => ({
      "wallet.credit.received": (event: MessageEvent<string>) => {
        const parsed = JSON.parse(
          event.data,
        ) as WalletEvent<WalletCreditReceivedPayload>
        const { amount, senderName } = parsed.payload
        toast.success(
          `${formatNairaWhole(amount)} received${senderName ? ` from ${senderName}` : ""}`,
        )
        refreshWalletSurfaces()
      },
      "wallet.fund.received": (event: MessageEvent<string>) => {
        const parsed = JSON.parse(event.data) as WalletEvent<{
          amount: number
        }>
        toast.success(
          `${formatNairaWhole(parsed.payload.amount)} added to your wallet.`,
        )
        refreshWalletSurfaces()
      },
      "wallet.transfer.completed": () => {
        refreshWalletSurfaces()
      },
      "wallet.transfer.failed": (event: MessageEvent<string>) => {
        const parsed = JSON.parse(event.data) as WalletEvent<{
          reference: string
          reason?: string
        }>
        toast.error(
          parsed.payload.reason ??
            `Transfer ${parsed.payload.reference} failed.`,
        )
        refreshWalletSurfaces()
      },
      "wallet.payment_request.paid": (event: MessageEvent<string>) => {
        const parsed = JSON.parse(event.data) as WalletEvent<{
          amount: number
        }>
        toast.success(
          `Payment request paid · ${formatNairaWhole(parsed.payload.amount)}`,
        )
        refreshWalletSurfaces()
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryClient],
  )

  useSse({ path: "/wallet/stream", events, enabled })
}
