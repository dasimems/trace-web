"use client"

import { useMemo } from "react"
import { motion } from "motion/react"

import { Skeleton } from "@/components/ui/skeleton"
import { MetricTrendCard } from "@/components/dashboard/metric-trend-card"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getRecurring, getAnomalies, getCashFlow } from "@/api/analysis"
import {
  getTransactionMetrics,
} from "@/api/transactions"
import { formatNairaWhole } from "@/lib/money"

function normalize(values: ReadonlyArray<number>): ReadonlyArray<number> {
  if (values.length === 0) return []
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (max === min) return values.map(() => 0.5)
  return values.map((v) => (v - min) / (max - min))
}

export function TransactionMetrics() {
  const metricsQuery = useEndpoint(
    "/transactions/metrics",
    getTransactionMetrics,
  )
  const cashFlowQuery = useEndpoint("/analysis/cashflow", getCashFlow)
  const recurringQuery = useEndpoint("/analysis/recurring", getRecurring)
  const anomaliesQuery = useEndpoint("/analysis/anomalies", getAnomalies)

  const loading =
    metricsQuery.isLoading ||
    cashFlowQuery.isLoading ||
    recurringQuery.isLoading ||
    anomaliesQuery.isLoading

  if (loading && !metricsQuery.data) {
    return <MetricsSkeleton />
  }

  const metrics = metricsQuery.data
  const cashFlow = cashFlowQuery.data
  const recurringCount = recurringQuery.data?.value?.patterns.length ?? 0
  const recurringCommitted = useMemo(
    () =>
      recurringQuery.data?.value?.patterns
        .filter((p) => p.direction === "DEBIT")
        .reduce((acc, p) => acc + p.averageAmount, 0) ?? 0,
    [recurringQuery.data?.value?.patterns],
  )
  const anomaliesCount = anomaliesQuery.data?.value?.anomalies.length ?? 0

  const inflowSeries = useMemo(
    () => cashFlow?.weeks.map((w) => w.income) ?? [],
    [cashFlow?.weeks],
  )
  const outflowSeries = useMemo(
    () => cashFlow?.weeks.map((w) => w.spend) ?? [],
    [cashFlow?.weeks],
  )
  const flatSeries = useMemo(
    () => normalize(cashFlow?.weeks.map((_, i) => i + 1) ?? []),
    [cashFlow?.weeks],
  )
  const normalizedInflow = useMemo(
    () => normalize(inflowSeries),
    [inflowSeries],
  )
  const normalizedOutflow = useMemo(
    () => normalize(outflowSeries),
    [outflowSeries],
  )

  if (!metrics || !cashFlow) {
    return <MetricsSkeleton />
  }

  return (
    <>
      <MetricTrendCard
        label="Inflow this month"
        value={formatNairaWhole(metrics.inflowThisMonth)}
        caption={`${metrics.inflowSources} source${metrics.inflowSources === 1 ? "" : "s"}`}
        pillLabel={metrics.inflowSources > 0 ? "Live" : "—"}
        pillTone="good"
        trendTone="lime"
        series={normalizedInflow}
      />
      <MetricTrendCard
        label="Outflow this month"
        value={formatNairaWhole(metrics.outflowThisMonth)}
        caption={`${metrics.outflowCategories} categor${metrics.outflowCategories === 1 ? "y" : "ies"}`}
        pillLabel={metrics.failedCount > 0 ? `${metrics.failedCount} failed` : "Live"}
        pillTone={metrics.failedCount > 0 ? "warn" : "good"}
        trendTone="warn"
        series={normalizedOutflow}
        delay={0.05}
      />
      <MetricTrendCard
        label="Recurring detected"
        value={String(recurringCount)}
        caption={
          recurringCommitted > 0
            ? `${formatNairaWhole(recurringCommitted)}/mo committed`
            : "Detecting patterns…"
        }
        pillLabel={recurringQuery.data?.status === "pending" ? "Pending" : "Live"}
        pillTone="good"
        trendTone="info"
        series={flatSeries}
        delay={0.1}
      />
      <MetricTrendCard
        label="Anomalies flagged"
        value={String(anomaliesCount)}
        caption={
          metrics.pendingCount > 0
            ? `${metrics.pendingCount} pending review`
            : "All clear"
        }
        pillLabel={anomaliesQuery.data?.status === "pending" ? "Pending" : "Live"}
        pillTone={anomaliesCount > 0 ? "warn" : "good"}
        trendTone={anomaliesCount > 0 ? "bad" : "good"}
        series={flatSeries}
        delay={0.15}
      />
    </>
  )
}

function MetricsSkeleton() {
  return (
    <>
      {[0, 0.05, 0.1, 0.15].map((delay) => (
        <motion.div
          key={delay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay, ease: "easeOut" }}
          className="col-span-12 rounded-2xl border border-border bg-card p-5 shadow-card sm:col-span-6 lg:col-span-3"
        >
          <div className="flex items-start justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-10" />
          </div>
          <Skeleton className="mt-3 h-8 w-28" />
          <Skeleton className="mt-2 h-3 w-36" />
          <Skeleton className="mt-3 h-14 w-full" />
        </motion.div>
      ))}
    </>
  )
}
