"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getLoanTier } from "@/api/loans"
import { formatNairaCompact } from "@/lib/money"

export function WhyYouQualify() {
  const { data, isLoading, error } = useEndpoint("/loans/tier", getLoanTier)

  return (
    <div className="rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5">
      <span className="ai-badge">Why you qualify</span>

      {data ? (
        <>
          {data.status === "ok" ? (
            <p className="mt-4 text-sm leading-relaxed text-text-2">
              You qualify for{" "}
              <span className="font-semibold text-lime-600 dark:text-lime-400">
                {data.tier}
              </span>{" "}
              with a health score of{" "}
              <span className="font-semibold text-foreground">
                {data.healthScore}
              </span>
              . Your current limit is{" "}
              <span className="font-semibold text-foreground">
                {formatNairaCompact(data.maxExposure)}
              </span>
              .
            </p>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-text-2">
              Not enough activity yet to score loan eligibility. We need ~14
              days of inflow + at least 14 transactions.
            </p>
          )}

          {data.reasons.length > 0 && (
            <ul className="mt-5 divide-y divide-lime-200/60 dark:divide-lime-500/20">
              {data.reasons.map((reason, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-3 py-3 text-sm"
                >
                  <span className="text-text-2">{reason}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : isLoading ? (
        <>
          <Skeleton className="mt-4 h-12 w-full" />
          <div className="mt-5 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
