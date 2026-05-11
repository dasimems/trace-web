"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type InvestmentPick = {
  id: string
  type: string
  title: string
  description: string
  return: string
  risk: string
  /** Confidence percent — used for the score in the corner. */
  confidence: number
}

export function InvestmentPickCard({
  pick,
  index,
}: {
  pick: InvestmentPick
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-lime-300"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-7 items-center rounded-md border border-info-200 bg-info-50 px-2.5 text-xs font-medium text-info-700 dark:border-info-500/30 dark:bg-info-500/15 dark:text-info-300">
          {pick.type}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-xs text-text-2">
          <Sparkles className="size-3.5 text-lime-500" />
          <span className="font-semibold tabular-nums text-lime-600 dark:text-lime-400">
            {pick.confidence}
          </span>
          % confidence
        </span>
      </div>

      <h3 className="mt-4 font-display text-base font-semibold leading-snug text-foreground">
        {pick.title}
      </h3>
      <p className="mt-1 text-sm text-text-2">{pick.description}</p>

      <PickSparkline className="mt-4" />

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
        <div className="flex gap-6">
          <Stat label="Return" value={pick.return} />
          <Stat label="Risk"   value={pick.risk}   />
        </div>
        <Button
          asChild
          variant="lime-outline"
          size="sm"
          className="h-8 gap-1 rounded-full px-3 text-xs"
        >
          <Link href={`/app/investments/${pick.id}`}>
            Allocate <ArrowRight />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-text-3">{label}</div>
      <div className={cn("mt-0.5 font-display text-sm font-semibold tabular-nums text-foreground")}>
        {value}
      </div>
    </div>
  )
}

function PickSparkline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 50"
      className={cn("h-12 w-full", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="pick-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-lime-500)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--color-lime-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 38 L24 36 L48 32 L72 30 L96 26 L120 22 L144 19 L168 18 L192 14 L216 11 L240 8 L240 50 L0 50 Z"
        fill="url(#pick-fill)"
      />
      <motion.path
        d="M0 38 L24 36 L48 32 L72 30 L96 26 L120 22 L144 19 L168 18 L192 14 L216 11 L240 8"
        fill="none"
        stroke="var(--color-lime-500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      />
    </svg>
  )
}
