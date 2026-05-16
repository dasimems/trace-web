"use client"

import { useEffect, type ComponentType } from "react"
import { useRouter } from "next/navigation"

import { Spinner } from "@/components/ui/spinner"
import { useUserHasHydrated } from "@/hooks/use-user-hydrated"
import useUserStore from "@/stores/user-store"

const SIGN_IN_PATH = "/auth/sign-in"
const BANK_STEP_PATH = "/auth/sign-up/bank"

export function withAuth<P extends object>(Component: ComponentType<P>) {
  function Authed(props: P) {
    const router = useRouter()
    const hydrated = useUserHasHydrated()
    const userDetails = useUserStore((s) => s.userDetails)
    const isLoading = useUserStore((s) => s.isLoading)

    useEffect(() => {
      if (!hydrated || isLoading) return
      if (!userDetails) {
        router.replace(SIGN_IN_PATH)
        return
      }
      if (!userDetails.isAccountCreationCompleted) {
        router.replace(BANK_STEP_PATH)
      }
    }, [hydrated, isLoading, userDetails, router])

    if (!hydrated || isLoading) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner className="size-6 text-text-3" />
        </div>
      )
    }

    if (!userDetails?.isAccountCreationCompleted) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner className="size-6 text-text-3" />
        </div>
      )
    }

    return <Component {...props} />
  }

  Authed.displayName = `withAuth(${
    Component.displayName ?? Component.name ?? "Component"
  })`

  return Authed
}
