"use client"

import { motion } from "motion/react"
import { formatDistanceToNow } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getNavSnapshot, type TNavSnapshot } from "@/api/investments"
import { formatPrice } from "@/lib/money"

export function NavPerUnitCard({ productId }: { productId: string }) {
  const { data, isLoading, error } = useEndpoint(
    productId ? `/investments/products/${productId}/nav` : null,
    () => getNavSnapshot(productId),
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="text-sm text-text-3">NAV · per unit</div>

      {data ? (
        <Resolved snapshot={data} />
      ) : isLoading ? (
        <NavSkeleton />
      ) : (
        <p className="mt-3 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

function Resolved({ snapshot }: { snapshot: TNavSnapshot }) {
  const changePct = (snapshot.change24hBps / 100).toFixed(2)
  const positive = snapshot.change24hBps >= 0
  const ytdPct = (snapshot.ytdReturnBps / 100).toFixed(1)
  return (
    <>
      <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
        {formatPrice(snapshot.navPerUnit)}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Badge
          variant={positive ? "good" : "warn"}
          className="h-6 px-2.5 text-[11px]"
        >
          {positive ? "↑" : "↓"} {changePct}% 24h
        </Badge>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          YTD {ytdPct}%
        </Badge>
        <span className="text-xs text-text-3">
          Priced {formatDistanceToNow(new Date(snapshot.asOf), { addSuffix: true })}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted"
      >
        <motion.span
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(100, Math.max(0, snapshot.ytdReturnBps / 10))}%`,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="block h-full rounded-full bg-good-500"
        />
      </motion.div>
    </>
  )
}

function NavSkeleton() {
  return (
    <>
      <Skeleton className="mt-2 h-8 w-32" />
      <div className="mt-2 flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="mt-4 h-1 w-full" />
    </>
  )
}
