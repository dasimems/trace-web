"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export type WhyReason = {
  label: string
  percent: number
  description: string
}

type WhyCardProps = {
  badgeLabel: string
  caption?: string
  quote?: string
  reasons: ReadonlyArray<WhyReason>
  className?: string
}

export function WhyCard({
  badgeLabel,
  caption,
  quote,
  reasons,
  className,
}: WhyCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="ai-badge">{badgeLabel}</span>
        {caption && (
          <span className="text-xs text-text-3">{caption}</span>
        )}
      </div>

      {quote && (
        <p className="mt-4 text-sm leading-relaxed text-text-2">{quote}</p>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {reasons.map((reason) => (
          <ReasonBox key={reason.label} reason={reason} />
        ))}
      </div>
    </div>
  )
}

function ReasonBox({ reason }: { reason: WhyReason }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {reason.label}
        </span>
        <span className="font-display tabular-nums text-lime-600 dark:text-lime-400">
          {reason.percent}%
        </span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${reason.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="block h-full rounded-full bg-lime-500"
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-2">
        {reason.description}
      </p>
    </div>
  )
}
