"use client"

import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"

import { LogoWordmark } from "@/components/landing/logo-mark"
import { SafetyBadge } from "@/components/auth/safety-badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type AuthShellProps = {
  aside?: ReactNode
  children: ReactNode
  helpHref?: string
}

const SHELL_STYLE: CSSProperties = {
  ["--sidebar-width" as string]: "22rem",
  ["--sidebar" as string]: "var(--card)",
}

export function AuthShell({
  aside,
  children,
  helpHref = "#help",
}: AuthShellProps) {
  return (
    <SidebarProvider defaultOpen style={SHELL_STYLE}>
      <Sidebar collapsible="offcanvas" className="border-r border-border">
        <SidebarHeader className="px-8 py-8">
          <Link href="/" aria-label="Trace home" className="inline-block">
            <LogoWordmark />
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-8 py-6">{aside}</SidebarContent>
        <SidebarFooter className="px-8 py-8">
          <SafetyBadge />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background">
        <header className="flex items-center justify-between px-6 py-5 lg:px-12 lg:py-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden" aria-label="Open steps" />
            <Link
              href="/"
              aria-label="Trace home"
              className="inline-block md:hidden"
            >
              <LogoWordmark />
            </Link>
          </div>
          <div className="text-sm text-text-3">
            Need help?{" "}
            <a
              href={helpHref}
              className="font-medium text-lime-600 transition-colors hover:text-lime-700 dark:text-lime-400"
            >
              Chat with us
            </a>
          </div>
        </header>

        <div className="flex-1 px-6 pb-16 lg:px-12">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
