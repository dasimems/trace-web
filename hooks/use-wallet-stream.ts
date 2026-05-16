"use client"

import { useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { useSse } from "@/hooks/use-sse"
import { formatNairaWhole } from "@/lib/money"

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
        // Refresh wallet snapshot + transaction list so the balance card and
        // activity table reflect the credit immediately.
        queryClient.invalidateQueries({ queryKey: ["/wallet"] })
        queryClient.invalidateQueries({ queryKey: ["/transactions"] })
        queryClient.invalidateQueries({ queryKey: ["/transactions/metrics"] })
      },
      "wallet.transfer.completed": () => {
        queryClient.invalidateQueries({ queryKey: ["/wallet"] })
        queryClient.invalidateQueries({ queryKey: ["/transactions"] })
        queryClient.invalidateQueries({ queryKey: ["/transactions/metrics"] })
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
        queryClient.invalidateQueries({ queryKey: ["/wallet"] })
        queryClient.invalidateQueries({ queryKey: ["/transactions"] })
      },
    }),
    [queryClient],
  )

  useSse({ path: "/wallet/stream", events, enabled })
}
