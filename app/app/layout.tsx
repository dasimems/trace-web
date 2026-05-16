"use client"

import type { ReactNode } from "react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardStreams } from "@/components/dashboard/dashboard-streams"
import { withAuth } from "@/components/auth/with-auth"

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell>
      <DashboardStreams />
      {children}
    </DashboardShell>
  )
}

export default withAuth(AppLayout)
