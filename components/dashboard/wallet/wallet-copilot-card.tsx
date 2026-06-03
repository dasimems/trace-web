"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getCopilotContext, type TCopilotContext } from "@/api/copilot"
import { formatPriceCompact } from "@/lib/money"

export function WalletCopilotCard() {
  const { data, isLoading, error } = useEndpoint(
    "/copilot/context",
    getCopilotContext,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="ai-badge">Wallet copilot</span>
        {data && (
          <Badge variant={data.healthTone} className="h-6 px-2.5 text-[11px]">
            Health {data.healthScore}
          </Badge>
        )}
      </div>

      {data ? (
        <Resolved context={data} />
      ) : isLoading ? (
        <ContextSkeleton />
      ) : (
        <p className="mt-4 text-sm text-destructive">
          {error ?? "No copilot context yet."}
        </p>
      )}
    </motion.div>
  )
}

function Resolved({ context }: { context: TCopilotContext }) {
  const headline = context.topRecommendation?.title ?? context.weeklySummaryHeadline
  const detail = context.topRecommendation?.detail
  return (
    <>
      <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
        {headline}
      </h3>
      {detail && (
        <p className="mt-3 text-sm leading-relaxed text-text-2">{detail}</p>
      )}

      <p className="mt-3 text-xs text-text-3">
        Live buffer ·{" "}
        <span className="font-semibold text-foreground">
          {context.liveBufferPercent}%
        </span>{" "}
        of weekly inflow uncommitted
      </p>

      {context.upcomingObligations.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-text-2">
          {context.upcomingObligations.slice(0, 3).map((o, i) => (
            <li
              key={`${o.label}-${i}`}
              className="flex items-baseline justify-between gap-3"
            >
              <span>{o.label}</span>
              <span className="font-display tabular-nums text-foreground">
                {formatPriceCompact(o.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <Button size="lg" className="h-9 rounded-full px-4 shadow-primary">
          Talk to Copilot <ArrowRight />
        </Button>
      </div>
    </>
  )
}

function ContextSkeleton() {
  return (
    <>
      <Skeleton className="mt-4 h-8 w-3/4" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-1 h-4 w-2/3" />
      <Skeleton className="mt-4 h-9 w-32 rounded-full" />
    </>
  )
}
