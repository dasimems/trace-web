"use client"

import type { CSSProperties, ReactNode } from "react"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

const SHELL_STYLE: CSSProperties = {
  ["--sidebar-width" as string]: "16rem",
  ["--sidebar" as string]: "var(--card)",
}

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen style={SHELL_STYLE}>
      <DashboardSidebar />
      <SidebarInset className="bg-background">{children}</SidebarInset>
    </SidebarProvider>
  )
}
