"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { Bell, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

type DashboardTopbarProps = {
  title: string
  meta: string
  actions?: ReactNode
}

export function DashboardTopbar({
  title,
  meta,
  actions,
}: DashboardTopbarProps) {
  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-border bg-background px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:flex-nowrap lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
        <SidebarTrigger className="lg:hidden" aria-label="Open menu" />
        <div className="min-w-0">
          <h1 className="truncate font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {title}
          </h1>
          <p className="mt-0.5 truncate text-xs text-text-3">{meta}</p>
        </div>
      </div>

      <SearchField className="order-last w-full lg:order-none lg:max-w-md lg:flex-1" />

      <div className="flex items-center gap-2 lg:ml-auto">
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <CopilotPill />
      </div>
    </header>
  )
}

function SearchField({ className }: { className?: string }) {
  return (
    <label
      className={`relative flex h-10 items-center rounded-full border border-border bg-card px-3 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 sm:px-4 ${className ?? ""}`}
    >
      <Search className="size-4 shrink-0 text-text-3" />
      <input
        type="search"
        placeholder="Ask Copilot or search…"
        className="ml-2 h-full flex-1 bg-transparent text-sm outline-none placeholder:text-text-3"
      />
      <kbd className="ml-2 hidden h-6 items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-text-3 sm:inline-flex">
        ⌘ K
      </kbd>
    </label>
  )
}

function CopilotPill() {
  return (
    <span className="inline-flex h-9 items-center gap-2 rounded-full bg-neutral-950 px-2.5 font-display text-xs font-semibold text-white sm:px-3 sm:text-sm">
      <motion.span
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="size-1.5 rounded-full bg-lime-500"
      />
      <span className="hidden sm:inline">Copilot online</span>
      <span className="sm:hidden">Copilot</span>
    </span>
  )
}
