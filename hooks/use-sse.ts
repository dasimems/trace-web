"use client"

import { useEffect, useRef } from "react"

import useUserStore from "@/stores/user-store"

type SseEventMap = Record<string, (event: MessageEvent<string>) => void>

type UseSseOptions = {
  // Path under the API base URL. Example: "/wallet/stream".
  path: string
  // Map of event type → handler. Each handler receives the raw MessageEvent;
  // call JSON.parse(event.data) to read the payload.
  events: SseEventMap
  // Set false to keep the connection closed (e.g. user signed out, page hidden).
  enabled?: boolean
  // Optional generic onerror — native EventSource auto-reconnects on its own
  // unless `close()` is called, so this is for logging/telemetry.
  onError?: (event: Event) => void
}

const SSE_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`

// Subscribes to a Server-Sent Events stream from the backend with full
// lifecycle handling: connects when a token is available, closes on unmount,
// reconnects when the token changes (sign-out → sign-in), and removes every
// event listener on teardown so listeners don't leak across reconnects.
export function useSse({ path, events, enabled = true, onError }: UseSseOptions) {
  const token = useUserStore((s) => s.accessToken)
  // Keep the handlers in a ref so changing them between renders doesn't tear
  // the connection down — only `path`/`token`/`enabled` should trigger that.
  const handlersRef = useRef<SseEventMap>(events)
  handlersRef.current = events

  useEffect(() => {
    if (!enabled) return
    if (typeof window === "undefined") return
    if (!token) return

    const url = `${SSE_BASE_URL}${path}?token=${encodeURIComponent(token)}`
    const source = new EventSource(url)

    const registered: Array<[string, EventListener]> = []
    for (const eventType of Object.keys(handlersRef.current)) {
      const listener: EventListener = (event) => {
        handlersRef.current[eventType]?.(event as MessageEvent<string>)
      }
      source.addEventListener(eventType, listener)
      registered.push([eventType, listener])
    }

    if (onError) {
      source.addEventListener("error", onError)
    }

    return () => {
      for (const [eventType, listener] of registered) {
        source.removeEventListener(eventType, listener)
      }
      if (onError) source.removeEventListener("error", onError)
      source.close()
    }
  }, [path, token, enabled, onError])
}
