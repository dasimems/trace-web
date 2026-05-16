"use client"

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { NavigationProgress } from "@/components/navigation-progress"
import useUserStore from "@/stores/user-store"

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  )

  // Root-level one-shot. Providers mounts once per full page load and survives
  // client navigation, so this never re-fires when the user moves between
  // pages — keeps the per-page useEndpoint calls free of an auth bootstrap.
  //
  // Bootstrap is gated on `persist.hasHydrated()` because zustand's rehydration
  // is *not* guaranteed to complete before our useEffect runs. If we ran
  // bootstrap before hydration, `get().accessToken` would still be null and we
  // would wipe a perfectly valid persisted session.
  const didBootstrap = useRef(false)
  useEffect(() => {
    if (didBootstrap.current) return

    const runBootstrap = () => {
      if (didBootstrap.current) return
      didBootstrap.current = true
      void useUserStore.getState().bootstrap()
    }

    if (useUserStore.persist.hasHydrated()) {
      runBootstrap()
      return
    }
    const unsubscribe = useUserStore.persist.onFinishHydration(runBootstrap)
    return unsubscribe
  }, [])

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      {children}
    </QueryClientProvider>
  )
}
