"use client"

import { useMemo } from "react"
import { Check } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"

import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getCopilotContext, type TCopilotContext } from "@/api/copilot"
import { formatNairaCompact } from "@/lib/money"

export function CopilotContextRail() {
  const { data, isLoading, error } = useEndpoint(
    "/copilot/context",
    getCopilotContext,
  )

  return (
    <aside className="space-y-5 border-border bg-background px-4 py-5 sm:px-6 sm:py-6 lg:border-l">
      <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        CONTEXT COPILOT IS USING
      </h3>

      {data ? (
        <ResolvedRail context={data} />
      ) : isLoading ? (
        <RailSkeleton />
      ) : (
        <p className="text-sm text-destructive">
          {error ?? "No copilot context yet."}
        </p>
      )}
    </aside>
  )
}

function ResolvedRail({ context }: { context: TCopilotContext }) {
  const rows = useMemo(() => {
    const next: Array<{ label: string; value: string }> = [
      {
        label: "Health score",
        value: `${context.healthScore} · ${context.healthTone}`,
      },
      {
        label: "Buffer (week)",
        value: `${context.liveBufferPercent}% free`,
      },
    ]
    if (context.weeklySummaryHeadline) {
      next.push({ label: "This week", value: context.weeklySummaryHeadline })
    }
    if (context.topRecommendation) {
      next.push({
        label: context.topRecommendation.tag.label,
        value: context.topRecommendation.title,
      })
    }
    return next
  }, [
    context.healthScore,
    context.healthTone,
    context.liveBufferPercent,
    context.weeklySummaryHeadline,
    context.topRecommendation,
  ])

  return (
    <>
      <ul className="divide-y divide-border">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-baseline justify-between gap-3 py-3 text-sm"
          >
            <span className="text-text-2">{row.label}</span>
            <span className="ml-3 text-right font-display tabular-nums text-foreground">
              {row.value}
            </span>
          </li>
        ))}
      </ul>

      {context.upcomingObligations.length > 0 && (
        <div className="rounded-2xl border border-lime-300 bg-lime-50/40 p-4 dark:border-lime-500/40 dark:bg-lime-500/5">
          <h4 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
            UPCOMING OBLIGATIONS
          </h4>
          <ul className="mt-3 space-y-2.5">
            {context.upcomingObligations.slice(0, 4).map((o, i) => (
              <li
                key={`${o.label}-${i}`}
                className="flex items-start gap-2 text-sm leading-relaxed text-text-2"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-lime-500" />
                <span className="flex-1">
                  <span className="font-medium text-foreground">{o.label}</span>
                  <span className="ml-2 text-text-3">
                    {formatNairaCompact(o.amount)} ·{" "}
                    {formatRelative(o.dueAt)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

function formatRelative(dueAt: string): string {
  const due = new Date(dueAt)
  const now = Date.now()
  const diffMs = due.getTime() - now
  const fortyEightHours = 48 * 60 * 60 * 1000
  if (Math.abs(diffMs) < fortyEightHours) {
    return formatDistanceToNow(due, { addSuffix: true })
  }
  return format(due, "EEE d MMM")
}

function RailSkeleton() {
  return (
    <ul className="divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <li
          key={i}
          className="flex items-baseline justify-between gap-3 py-3"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </li>
      ))}
    </ul>
  )
}
