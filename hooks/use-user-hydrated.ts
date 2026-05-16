"use client"

import { useEffect, useState } from "react"

import useUserStore from "@/stores/user-store"

// Returns true once the persisted user-store slice has been rehydrated from
// localStorage. Components that gate auth redirects on `userDetails` must wait
// for hydration — zustand's persist middleware runs hydration asynchronously
// on the client, so the first render always sees `userDetails: null` even when
// a valid session exists in storage.
export function useUserHasHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      setHydrated(true)
      return
    }
    return useUserStore.persist.onFinishHydration(() => setHydrated(true))
  }, [])

  return hydrated
}
