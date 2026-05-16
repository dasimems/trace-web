"use client"

import { useEffect, useMemo } from "react"
import { motion } from "motion/react"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { formatNairaCompact } from "@/lib/money"
import useWalletStore from "@/stores/wallet-store"
import type { TWalletPocket, TWalletPocketType } from "@/api/wallet"

type SubBalanceTone = "lime" | "info" | "good"

const TONE_BY_TYPE: Record<TWalletPocketType, SubBalanceTone> = {
  SPEND: "lime",
  SAVE: "info",
  GOAL: "good",
}

const DOT_CLASSES: Record<SubBalanceTone, string> = {
  lime: "bg-lime-500",
  info: "bg-info-500",
  good: "bg-good-500",
}

const BAR_CLASSES: Record<SubBalanceTone, string> = {
  lime: "bg-lime-500",
  info: "bg-info-500",
  good: "bg-good-500",
}

function pocketFillPercent(pocket: TWalletPocket, maxBalance: number): number {
  if (pocket.type === "GOAL" && pocket.targetAmount && pocket.targetAmount > 0) {
    return Math.min(100, Math.round((pocket.balance / pocket.targetAmount) * 100))
  }
  if (maxBalance <= 0) return 0
  return Math.min(100, Math.round((pocket.balance / maxBalance) * 100))
}

export function SubBalancesCard() {
  const pockets = useWalletStore((s) => s.pockets)
  const isLoading = useWalletStore((s) => s.isLoadingPockets)
  const error = useWalletStore((s) => s.pocketsError)
  const hasFetched = useWalletStore((s) => s.hasFetchedPockets)
  const fetchPockets = useWalletStore((s) => s.fetchPockets)

  useEffect(() => {
    if (!hasFetched) fetchPockets()
  }, [hasFetched, fetchPockets])

  const maxBalance = useMemo(
    () => pockets.reduce((acc, p) => Math.max(acc, p.balance), 0),
    [pockets],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
      className="col-span-12 rounded-2xl border border-border bg-card p-6 shadow-card sm:col-span-6 xl:col-span-3"
    >
      <div className="flex items-center gap-1.5">
        <div className="text-sm text-text-3">Sub-balances</div>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Refresh sub-balances"
          title="Refresh sub-balances"
          onClick={() => fetchPockets()}
          disabled={isLoading}
          className="text-text-3 hover:text-foreground"
        >
          <RefreshCw className={isLoading ? "animate-spin" : undefined} />
        </Button>
      </div>
      {pockets.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {pockets.map((pocket) => {
            const tone = TONE_BY_TYPE[pocket.type]
            return (
              <li key={pocket.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-foreground">
                    <span className={cn("size-2 rounded-full", DOT_CLASSES[tone])} />
                    {pocket.name}
                  </span>
                  <span className="font-display tabular-nums text-foreground">
                    {formatNairaCompact(pocket.balance)}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{
                      width: `${pocketFillPercent(pocket, maxBalance)}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn("block h-full rounded-full", BAR_CLASSES[tone])}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      ) : isLoading || !error ? (
        <PocketsSkeleton />
      ) : (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}
    </motion.div>
  )
}

function PocketsSkeleton() {
  return (
    <ul className="mt-4 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-1.5 w-full" />
        </li>
      ))}
    </ul>
  )
}
