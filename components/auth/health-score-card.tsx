"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { GaugeMeter } from "@/components/auth/gauge-meter"

type StatTone = "lime" | "good" | "info"

type Stat = {
  label: string
  value: string
  pillLabel: string
  tone: StatTone
}

const STATS: ReadonlyArray<Stat> = [
  {
    label: "Avg monthly income",
    value: "₦612k",
    pillLabel: "+18% vs Q1",
    tone: "lime",
  },
  {
    label: "Stable weeks in a row",
    value: "9",
    pillLabel: "Repayment ready",
    tone: "good",
  },
  {
    label: "Safe-to-save",
    value: "₦42k/mo",
    pillLabel: "Auto-suggested",
    tone: "info",
  },
]

export function HealthScoreCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="text-sm text-text-3">Financial health score</div>
          <div className="mt-2 flex items-center gap-3">
            <span className="font-display text-6xl font-semibold tabular-nums tracking-tight text-foreground">
              82
            </span>
            <Badge variant="good" className="h-6 px-2.5 text-xs">
              Strong
            </Badge>
          </div>
          <div className="mt-2 text-sm text-text-3">
            Top 14% in your segment
          </div>
        </div>
        <GaugeMeter score={82} />
      </div>

      <div className="my-6 h-px w-full bg-border" />

      <div className="grid gap-6 sm:grid-cols-3">
        {STATS.map((stat) => (
          <StatBlock key={stat.label} stat={stat} />
        ))}
      </div>
    </motion.div>
  )
}

function StatBlock({ stat }: { stat: Stat }) {
  return (
    <div>
      <div className="text-sm text-text-3">{stat.label}</div>
      <div className="mt-1 font-display text-2xl font-semibold tabular-nums tracking-tight text-foreground">
        {stat.value}
      </div>
      <Badge
        variant={stat.tone === "lime" ? "lime" : stat.tone}
        className="mt-2 h-6 px-2.5 text-xs"
      >
        {stat.pillLabel}
      </Badge>
    </div>
  )
}
