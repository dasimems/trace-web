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
    <header className="flex flex-wrap items-center gap-4 border-b border-border bg-background px-6 py-4 lg:flex-nowrap lg:px-8">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" aria-label="Open menu" />
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-0.5 text-xs text-text-3">{meta}</p>
        </div>
      </div>

      <SearchField className="order-last w-full lg:order-none lg:max-w-md lg:flex-1" />

      <div className="ml-auto flex items-center gap-2">
        {actions}
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
      className={`relative flex h-10 items-center rounded-full border border-border bg-card px-4 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 ${className ?? ""}`}
    >
      <Search className="size-4 shrink-0 text-text-3" />
      <input
        type="search"
        placeholder="Ask Copilot or search transactions, opportunities…"
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
    <span className="inline-flex h-9 items-center gap-2 rounded-full bg-neutral-950 px-3 font-display text-sm font-semibold text-white">
      <motion.span
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="size-1.5 rounded-full bg-lime-500"
      />
      Copilot online
    </span>
  )
}
