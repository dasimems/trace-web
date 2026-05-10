"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const DAYS = 7
const HOURS = 24

function intensityAt(day: number, hour: number): number {
  const lunch = Math.exp(-Math.pow((hour - 13) / 2.6, 2))
  const dinner = Math.exp(-Math.pow((hour - 20) / 2.4, 2))
  const morning = hour >= 7 && hour <= 11 ? 0.18 : 0
  const weekendBoost = day === 4 || day === 5 ? 1.18 : day === 6 ? 0.85 : 1
  const noise = ((day * 31 + hour * 7) % 13) / 80
  const value = (lunch * 0.85 + dinner * 0.95 + morning) * weekendBoost - noise
  return Math.max(0, Math.min(1, value))
}

function intensityClass(value: number): string {
  if (value < 0.07) return "bg-lime-50 dark:bg-lime-500/5"
  if (value < 0.18) return "bg-lime-100 dark:bg-lime-500/10"
  if (value < 0.32) return "bg-lime-200 dark:bg-lime-500/20"
  if (value < 0.48) return "bg-lime-300 dark:bg-lime-500/35"
  if (value < 0.66) return "bg-lime-400 dark:bg-lime-500/55"
  if (value < 0.82) return "bg-lime-500 dark:bg-lime-500/75"
  return "bg-lime-600 dark:bg-lime-500"
}

const HOUR_LABELS = ["00:00", "06:00", "12:00", "18:00", "23:59"] as const

export function SpendingHeatmap() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Spending heatmap
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Mon–Sun · hourly
        </Badge>
        <span className="ml-auto text-xs text-text-3">darker = more spend</span>
      </div>

      <div className="mt-6 grid grid-cols-24 gap-1.5">
        {Array.from({ length: DAYS * HOURS }).map((_, i) => {
          const day = Math.floor(i / HOURS)
          const hour = i % HOURS
          const value = intensityAt(day, hour)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.002 * i }}
              className={cn("aspect-square rounded-md", intensityClass(value))}
            />
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[11px] tracking-wide text-text-3">
        {HOUR_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}
