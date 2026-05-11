"use client"

import { motion } from "motion/react"
import { ArrowUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type TrendTone = "lime" | "warn" | "good" | "info" | "bad"

type MetricTrendProps = {
  label: string
  value: string
  caption: string
  pillLabel: string
  pillTone: TrendTone
  /** Sparkline colour. Defaults to `pillTone`. */
  trendTone?: TrendTone
  /** 8–14 normalised values (0..1) describing the sparkline curve. */
  series: ReadonlyArray<number>
  delay?: number
}

const STROKE_VAR: Record<TrendTone, string> = {
  lime: "var(--color-lime-500)",
  warn: "var(--color-warn-500)",
  good: "var(--color-good-500)",
  info: "var(--color-info-500)",
  bad:  "var(--color-bad-500)",
}

export function MetricTrendCard({
  label,
  value,
  caption,
  pillLabel,
  pillTone,
  trendTone,
  series,
  delay = 0,
}: MetricTrendProps) {
  const stroke = STROKE_VAR[trendTone ?? pillTone]
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="col-span-12 rounded-2xl border border-border bg-card p-5 shadow-card sm:col-span-6 lg:col-span-3"
    >
      <div className="flex items-start justify-between">
        <div className="text-sm text-text-3">{label}</div>
        <Badge variant={pillTone} className="h-5 gap-1 px-2 text-[10px]">
          <ArrowUp className="size-3" />
          {pillLabel}
        </Badge>
      </div>
      <div className="mt-2 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-1 text-xs text-text-3">{caption}</div>
      <Sparkline series={series} stroke={stroke} className="mt-3" />
    </motion.div>
  )
}

function Sparkline({
  series,
  stroke,
  className,
}: {
  series: ReadonlyArray<number>
  stroke: string
  className?: string
}) {
  if (series.length < 2) return null
  const width = 220
  const height = 56
  const stepX = width / (series.length - 1)
  const points = series.map((y, i) => {
    const px = i * stepX
    const py = height - 4 - y * (height - 8)
    return `${px} ${py}`
  })
  const linePath = `M ${points.join(" L ")}`
  const fillPath = `${linePath} L ${width} ${height} L 0 ${height} Z`
  const gradId = `spark-fill-${stroke.replace(/[^a-z0-9]/gi, "")}`
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-14 w-full", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${gradId})`} />
      <motion.path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      />
    </svg>
  )
}
