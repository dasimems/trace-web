"use client"

import { useEffect, useMemo } from "react"
import { motion } from "motion/react"
import { Plus, RefreshCw } from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { formatPriceCompact } from "@/lib/money"
import useWalletStore from "@/stores/wallet-store"
import type { TWalletPocket, TWalletPocketType } from "@/api/wallet"

type Tone = "lime" | "info" | "good"

const TONE_BY_TYPE: Record<TWalletPocketType, Tone> = {
  SPEND: "lime",
  SAVE: "info",
  GOAL: "good",
}

const CAPTION_BY_TYPE: Record<TWalletPocketType, string> = {
  SPEND: "Day-to-day money",
  SAVE: "13.2% p.a. · withdraw anytime",
  GOAL: "Locked toward your target",
}

const DOT: Record<Tone, string> = {
  lime: "bg-lime-500",
  info: "bg-info-500",
  good: "bg-good-500",
}

const FILL: Record<Tone, string> = {
  lime: "bg-lime-500",
  info: "bg-info-500",
  good: "bg-good-500",
}

function pocketPercent(pocket: TWalletPocket, totalBalance: number): number {
  if (
    pocket.type === "GOAL" &&
    pocket.targetAmount &&
    pocket.targetAmount.amount > 0
  ) {
    return Math.min(
      100,
      Math.round((pocket.balance.amount / pocket.targetAmount.amount) * 100),
    )
  }
  if (totalBalance <= 0) return 0
  return Math.min(100, Math.round((pocket.balance.amount / totalBalance) * 100))
}

function pocketMeta(pocket: TWalletPocket): string {
  if (pocket.type === "GOAL" && pocket.targetAmount) {
    return `Target ${formatPriceCompact(pocket.targetAmount)} · updated ${
      pocket.updatedAt
        ? format(new Date(pocket.updatedAt), "d MMM")
        : "recently"
    }`
  }
  if (pocket.type === "SAVE") return "Move funds in any time"
  return "Auto-tags every transaction"
}

export function WalletSubBalances() {
  const pockets = useWalletStore((s) => s.pockets)
  const isLoading = useWalletStore((s) => s.isLoadingPockets)
  const error = useWalletStore((s) => s.pocketsError)
  const hasFetched = useWalletStore((s) => s.hasFetchedPockets)
  const fetchPockets = useWalletStore((s) => s.fetchPockets)

  useEffect(() => {
    if (!hasFetched) fetchPockets()
  }, [hasFetched, fetchPockets])

  const totalBalance = useMemo(
    () => pockets.reduce((acc, p) => acc + p.balance.amount, 0),
    [pockets],
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-base font-semibold text-foreground">
            Sub-balances
          </h3>
          {pockets.length > 0 && (
            <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
              {pockets.length} pocket{pockets.length === 1 ? "" : "s"}
            </Badge>
          )}
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
        <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full px-3 text-xs">
          <Plus />
          New goal
        </Button>
      </div>

      {pockets.length === 0 ? (
        isLoading || !error ? (
          <PocketsSkeleton />
        ) : error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-4 text-sm text-text-3">
            No pockets yet — create one to split your wallet.
          </p>
        )
      ) : (
        <ul className="mt-4 space-y-4">
          {pockets.map((pocket) => {
            const tone = TONE_BY_TYPE[pocket.type]
            const percent = pocketPercent(pocket, totalBalance)
            return (
              <li
                key={pocket.id}
                className="rounded-xl border border-border bg-background/30 p-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <span className={cn("size-2 rounded-full", DOT[tone])} />
                      {pocket.name}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-text-3">
                      {CAPTION_BY_TYPE[pocket.type]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-sm font-semibold tabular-nums text-foreground">
                      {formatPriceCompact(pocket.balance)}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-text-3">
                      {percent}%
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn("block h-full rounded-full", FILL[tone])}
                  />
                </div>

                <div className="mt-2 text-xs text-text-3">
                  {pocketMeta(pocket)}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function PocketsSkeleton() {
  return (
    <ul className="mt-4 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="rounded-xl border border-border bg-background/30 p-3.5">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="mt-3 h-1.5 w-full" />
          <Skeleton className="mt-2 h-3 w-32" />
        </li>
      ))}
    </ul>
  )
}
