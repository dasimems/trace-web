"use client"

import { motion } from "motion/react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { TInvestmentProduct } from "@/api/investments"

type RiskTone = "good" | "lime" | "info" | "warn" | "bad"

const RISK_LEVEL_TONE: Record<string, RiskTone> = {
  LOW: "good",
  LOW_MEDIUM: "lime",
  MEDIUM: "info",
  MEDIUM_HIGH: "warn",
  HIGH: "bad",
}

const RISK_LEVEL_FILL: Record<string, number> = {
  LOW: 95,
  LOW_MEDIUM: 80,
  MEDIUM: 60,
  MEDIUM_HIGH: 40,
  HIGH: 25,
}

const FILL: Record<RiskTone, string> = {
  good: "bg-good-500",
  lime: "bg-lime-500",
  info: "bg-info-500",
  warn: "bg-warn-500",
  bad: "bg-bad-500",
}

const VALUE_TEXT: Record<RiskTone, string> = {
  good: "text-good-600 dark:text-good-400",
  lime: "text-lime-600 dark:text-lime-400",
  info: "text-info-600 dark:text-info-400",
  warn: "text-warn-600 dark:text-warn-400",
  bad: "text-bad-600 dark:text-bad-400",
}

function humanize(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function RiskHonestRead({
  product,
}: {
  product: TInvestmentProduct | null
}) {
  if (!product) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="font-display text-base font-semibold text-foreground">
          Risk · honest read
        </h3>
        <div className="mt-4 space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-1.5 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    )
  }

  const tone = RISK_LEVEL_TONE[product.riskLevel] ?? "info"
  const fillPercent = RISK_LEVEL_FILL[product.riskLevel] ?? 50

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Risk · honest read
      </h3>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-2">Risk profile</span>
          <span className={cn("font-display tabular-nums", VALUE_TEXT[tone])}>
            {humanize(product.riskLevel)}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: `${fillPercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("block h-full rounded-full", FILL[tone])}
          />
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-text-2">
        {product.riskNarrative ??
          "Trace's risk team hasn't published an explainer for this product yet."}
      </p>
    </div>
  )
}
