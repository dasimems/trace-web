"use client"

import { useMemo } from "react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getSpendHeatmap, type TSpendHeatmapCell } from "@/api/analysis"
import { formatNairaCompact } from "@/lib/money"

const DAYS = 7
const HOURS = 24

function intensityClass(value: number): string {
  if (value < 0.01) return "bg-muted/40"
  if (value < 0.18) return "bg-lime-100 dark:bg-lime-500/10"
  if (value < 0.32) return "bg-lime-200 dark:bg-lime-500/20"
  if (value < 0.48) return "bg-lime-300 dark:bg-lime-500/35"
  if (value < 0.66) return "bg-lime-400 dark:bg-lime-500/55"
  if (value < 0.82) return "bg-lime-500 dark:bg-lime-500/75"
  return "bg-lime-600 dark:bg-lime-500"
}

const HOUR_LABELS = ["00:00", "06:00", "12:00", "18:00", "23:59"] as const
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

function buildGrid(cells: TSpendHeatmapCell[]): {
  grid: number[][]
  max: number
} {
  const grid = Array.from({ length: DAYS }, () => new Array(HOURS).fill(0)) as number[][]
  let max = 0
  for (const cell of cells) {
    grid[cell.dayOfWeek][cell.hour] = cell.amount
    if (cell.amount > max) max = cell.amount
  }
  return { grid, max }
}

export function SpendingHeatmap() {
  const { data, isLoading, error } = useEndpoint(
    "/analysis/spend-heatmap?days=30",
    () => getSpendHeatmap(30),
  )

  const { grid, max } = useMemo(
    () => buildGrid(data?.cells ?? []),
    [data?.cells],
  )

  const peakLabel = data?.peakCell
    ? `Peak ${DAY_LABELS[data.peakCell.dayOfWeek]} ${String(data.peakCell.hour).padStart(2, "0")}:00 · ${formatNairaCompact(data.peakCell.amount)}`
    : null

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Spending heatmap
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Last 30 days
        </Badge>
        <span className="ml-auto text-xs text-text-3">darker = more spend</span>
      </div>

      {isLoading && !data ? (
        <HeatmapSkeleton />
      ) : error ? (
        <p className="mt-6 text-sm text-destructive">{error}</p>
      ) : data && data.cells.length === 0 ? (
        <p className="mt-6 text-sm text-text-3">
          No spending tracked yet in this window.
        </p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-24 gap-1.5">
            {grid.flatMap((row, day) =>
              row.map((amount, hour) => {
                const value = max > 0 ? amount / max : 0
                return (
                  <motion.div
                    key={`${day}-${hour}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.002 * (day * HOURS + hour),
                    }}
                    title={
                      amount > 0
                        ? `${DAY_LABELS[day]} ${String(hour).padStart(2, "0")}:00 · ${formatNairaCompact(amount)}`
                        : undefined
                    }
                    className={cn(
                      "aspect-square rounded-md",
                      intensityClass(value),
                    )}
                  />
                )
              }),
            )}
          </div>

          <div className="mt-3 flex items-center justify-between font-mono text-[11px] tracking-wide text-text-3">
            {HOUR_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          {peakLabel && (
            <p className="mt-3 text-xs text-text-3">{peakLabel}</p>
          )}
        </>
      )}
    </div>
  )
}

function HeatmapSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-24 gap-1.5">
      {Array.from({ length: DAYS * HOURS }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-md" />
      ))}
    </div>
  )
}
