"use client"

import { useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { useSse } from "@/hooks/use-sse"

type AnalysisTopic =
  | "health"
  | "risk-stability"
  | "recurring"
  | "anomalies"
  | "summary"
  | "recommendations"

type AnalysisCompletedEvent<T = unknown> = {
  type: `analysis.${AnalysisTopic}.completed`
  payload: T
}

// Each insight is exposed via /analysis/<topic> and the cached endpoints return
// `{ status, lastUpdated, value }`. When an `analysis.<topic>.completed` event
// fires we update the matching cache directly so the card re-renders without
// an extra round-trip.
const TOPIC_PATH: Record<AnalysisTopic, string> = {
  health: "/analysis/health",
  "risk-stability": "/analysis/risk-stability",
  recurring: "/analysis/recurring",
  anomalies: "/analysis/anomalies",
  summary: "/analysis/summary",
  recommendations: "/analysis/recommendations",
}

const TOPICS = Object.keys(TOPIC_PATH) as AnalysisTopic[]

export function useAnalysisStream({ enabled = true } = {}) {
  const queryClient = useQueryClient()

  const events = useMemo(() => {
    const handlers: Record<string, (event: MessageEvent<string>) => void> = {}

    for (const topic of TOPICS) {
      handlers[`analysis.${topic}.completed`] = (event) => {
        const parsed = JSON.parse(event.data) as AnalysisCompletedEvent
        queryClient.setQueryData([TOPIC_PATH[topic]], {
          status: "fresh",
          lastUpdated: new Date().toISOString(),
          value: parsed.payload,
        })
      }
      handlers[`analysis.${topic}.failed`] = () => {
        // Force a re-fetch so the card can surface the cached state (which
        // may still be pending) and reflect that the latest refresh didn't
        // land for this topic.
        queryClient.invalidateQueries({ queryKey: [TOPIC_PATH[topic]] })
      }
    }

    // Refresh-cycle events — broad invalidation guarantees nothing stays stale
    // even if a per-topic event was dropped by an intermediate proxy.
    handlers["analysis.refresh.completed"] = () => {
      for (const topic of TOPICS) {
        queryClient.invalidateQueries({ queryKey: [TOPIC_PATH[topic]] })
      }
    }

    return handlers
  }, [queryClient])

  useSse({ path: "/analysis/stream", events, enabled })
}
