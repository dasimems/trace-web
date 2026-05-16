"use client"

import { useEffect, type ComponentType } from "react"
import { useRouter } from "next/navigation"

import { Spinner } from "@/components/ui/spinner"
import useUserStore, { type TUserDetails } from "@/stores/user-store"

const DASHBOARD_PATH = "/app/overview"
const BANK_STEP_PATH = "/auth/sign-up/bank"

function resolveAuthedDestination(user: TUserDetails) {
  return user.isAccountCreationCompleted ? DASHBOARD_PATH : BANK_STEP_PATH
}

export function withRedirectIfAuthed<P extends object>(
  Component: ComponentType<P>,
) {
  function RedirectIfAuthed(props: P) {
    const router = useRouter()
    const userDetails = useUserStore((s) => s.userDetails)
    const isLoading = useUserStore((s) => s.isLoading)

    useEffect(() => {
      if (isLoading || !userDetails) return
      router.replace(resolveAuthedDestination(userDetails))
    }, [isLoading, userDetails, router])

    if (isLoading) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner className="size-6 text-text-3" />
        </div>
      )
    }

    if (userDetails) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner className="size-6 text-text-3" />
        </div>
      )
    }

    return <Component {...props} />
  }

  RedirectIfAuthed.displayName = `withRedirectIfAuthed(${
    Component.displayName ?? Component.name ?? "Component"
  })`

  return RedirectIfAuthed
}
