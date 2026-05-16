"use client"

import { useMemo } from "react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MetricTrendCard } from "@/components/dashboard/metric-trend-card"
import { getCashFlow, type TCashFlow } from "@/api/analysis"
import {
  getTransactionMetrics,
  type TTransactionMetrics,
} from "@/api/transactions"
import { useEndpoint } from "@/hooks/use-endpoint"
import { formatNairaWhole } from "@/lib/money"

function normalize(values: ReadonlyArray<number>): ReadonlyArray<number> {
  if (values.length === 0) return []
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (max === min) return values.map(() => 0.5)
  return values.map((v) => (v - min) / (max - min))
}

function percentChange(values: ReadonlyArray<number>): number | null {
  if (values.length < 4) return null
  const mid = Math.floor(values.length / 2)
  const firstHalf = values.slice(0, mid)
  const secondHalf = values.slice(mid)
  const avg = (xs: ReadonlyArray<number>) =>
    xs.reduce((a, b) => a + b, 0) / xs.length
  const before = avg(firstHalf)
  const after = avg(secondHalf)
  if (before === 0) return null
  return Math.round(((after - before) / Math.abs(before)) * 100)
}

function pillFor(
  pct: number | null,
): { pillLabel: string; pillTone: "lime" | "warn" | "good" } {
  if (pct === null) return { pillLabel: "—", pillTone: "good" }
  const sign = pct >= 0 ? "+" : ""
  return {
    pillLabel: `${sign}${pct}%`,
    pillTone: pct >= 0 ? "lime" : "warn",
  }
}

export function OverviewTrends() {
  const metricsQuery = useEndpoint(
    "/transactions/metrics",
    getTransactionMetrics,
  )
  const cashFlowQuery = useEndpoint("/analysis/cashflow", getCashFlow)

  if (metricsQuery.isLoading || cashFlowQuery.isLoading) {
    return <TrendsSkeleton />
  }

  if (metricsQuery.error || cashFlowQuery.error) {
    return (
      <ErrorPanel message={metricsQuery.error ?? cashFlowQuery.error ?? ""} />
    )
  }

  const metrics = metricsQuery.data
  const cashFlow = cashFlowQuery.data
  if (!metrics || !cashFlow) return <TrendsSkeleton />

  return <Trends metrics={metrics} cashFlow={cashFlow} />
}

function Trends({
  metrics,
  cashFlow,
}: {
  metrics: TTransactionMetrics
  cashFlow: TCashFlow
}) {
  const netSeries = useMemo(
    () => cashFlow.weeks.map((w) => w.income - w.spend),
    [cashFlow.weeks],
  )
  const spendSeries = useMemo(
    () => cashFlow.weeks.map((w) => w.spend),
    [cashFlow.weeks],
  )
  const forecastSeries = useMemo(
    () =>
      cashFlow.weeks.map((w) => w.forecast ?? 0).filter((v) => v > 0),
    [cashFlow.weeks],
  )

  const netCash = metrics.inflowThisMonth - metrics.outflowThisMonth
  const projectedSafeToSave = useMemo(() => {
    if (forecastSeries.length === 0) return null
    return Math.max(
      0,
      Math.round(
        forecastSeries.reduce((a, b) => a + b, 0) / forecastSeries.length,
      ),
    )
  }, [forecastSeries])

  const normalizedNet = useMemo(() => normalize(netSeries), [netSeries])
  const normalizedSpend = useMemo(
    () => normalize(spendSeries),
    [spendSeries],
  )
  const normalizedForecast = useMemo(
    () =>
      normalize(
        forecastSeries.length > 0 ? forecastSeries : spendSeries,
      ),
    [forecastSeries, spendSeries],
  )
  const netPill = useMemo(() => pillFor(percentChange(netSeries)), [netSeries])
  const spendPill = useMemo(
    () => pillFor(percentChange(spendSeries)),
    [spendSeries],
  )

  return (
    <>
      <MetricTrendCard
        label="Net cash this month"
        value={formatNairaWhole(netCash)}
        caption={`${cashFlow.weeks.length} weeks of activity`}
        {...netPill}
        series={normalizedNet}
        delay={0.05}
      />
      <MetricTrendCard
        label="Spending"
        value={formatNairaWhole(metrics.outflowThisMonth)}
        caption={`${metrics.outflowCategories} categories this month`}
        {...spendPill}
        series={normalizedSpend}
        delay={0.1}
      />
      <MetricTrendCard
        label="Safe-to-save"
        value={
          projectedSafeToSave !== null
            ? formatNairaWhole(projectedSafeToSave)
            : "—"
        }
        caption={
          forecastSeries.length > 0
            ? "AI-projected weekly average"
            : "Need more activity to forecast"
        }
        pillLabel={forecastSeries.length > 0 ? "Forecast" : "Pending"}
        pillTone="good"
        series={normalizedForecast}
        delay={0.15}
      />
    </>
  )
}

function TrendsSkeleton() {
  return (
    <>
      {[0.05, 0.1, 0.15].map((delay) => (
        <motion.div
          key={delay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay, ease: "easeOut" }}
          className="col-span-12 rounded-2xl border border-border bg-card p-5 shadow-card sm:col-span-6 lg:col-span-3"
        >
          <div className="flex items-start justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-10" />
          </div>
          <Skeleton className="mt-3 h-8 w-32" />
          <Skeleton className="mt-2 h-3 w-40" />
          <Skeleton className="mt-3 h-14 w-full" />
        </motion.div>
      ))}
    </>
  )
}

function ErrorPanel({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="col-span-12 rounded-2xl border border-border bg-card p-5 shadow-card lg:col-span-9"
    >
      <Badge variant="warn" className="h-6 px-2.5 text-xs">
        Trends unavailable
      </Badge>
      <p className="mt-2 text-sm text-text-2">{message}</p>
    </motion.div>
  )
}
