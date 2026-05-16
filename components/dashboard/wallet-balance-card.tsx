"use client"

import { useEffect } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, CreditCard, Plus, Receipt } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatNaira, splitNairaParts } from "@/lib/money"
import useWalletStore from "@/stores/wallet-store"

const ACTIONS = [
  { label: "Send",    icon: ArrowUpRight, primary: false },
  { label: "Request", icon: Receipt,      primary: false },
  { label: "Cards",   icon: CreditCard,   primary: false },
] as const

export function WalletBalanceCard() {
  const snapshot = useWalletStore((s) => s.snapshot)
  const isLoading = useWalletStore((s) => s.isLoading)
  const fetchError = useWalletStore((s) => s.fetchError)
  const fetchWallet = useWalletStore((s) => s.fetchWallet)
  const hasFetched = useWalletStore((s) => s.hasFetched)

  useEffect(() => {
    if (!hasFetched) fetchWallet()
  }, [hasFetched, fetchWallet])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
      className="col-span-12 rounded-2xl border border-border bg-card p-6 shadow-card sm:col-span-6 xl:col-span-4"
    >
      <div className="flex items-start justify-between">
        <div className="text-sm text-text-3">Wallet balance</div>
        <Badge variant="good" className="h-6 px-2.5 text-xs">
          NDIC-insured
        </Badge>
      </div>

      {snapshot ? (
        <BalanceDisplay
          available={snapshot.balance.available}
          ledger={snapshot.balance.ledger}
        />
      ) : isLoading || !fetchError ? (
        <BalanceSkeleton />
      ) : (
        <p className="mt-4 text-sm text-destructive">{fetchError}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="lg" className="h-9 gap-1.5 rounded-full px-3.5 shadow-primary">
          <Plus />
          Fund
        </Button>
        {ACTIONS.map(({ label, icon: Icon }) => (
          <Button
            key={label}
            variant="outline"
            size="lg"
            className="h-9 gap-1.5 rounded-full px-3.5"
          >
            <Icon />
            {label}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}

function BalanceDisplay({
  available,
  ledger,
}: {
  available: number
  ledger: number
}) {
  const parts = splitNairaParts(available)
  return (
    <>
      <div className="mt-3 flex items-baseline">
        <span className="font-display text-4xl font-semibold tabular-nums tracking-tight text-foreground">
          {parts.whole}
        </span>
        <span className="font-display text-xl font-semibold tabular-nums text-text-3">
          {parts.decimal}
        </span>
      </div>
      <div className="mt-1 text-sm text-text-3">
        Available to spend · Ledger {formatNaira(ledger)}
      </div>
    </>
  )
}

function BalanceSkeleton() {
  return (
    <>
      <Skeleton className="mt-3 h-10 w-48" />
      <Skeleton className="mt-2 h-4 w-56" />
    </>
  )
}
