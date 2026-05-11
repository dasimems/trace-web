"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowLeft, ChevronRight } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"

type Crumb = {
  label: string
  href?: string
}

type DetailHeaderProps = {
  backHref: string
  breadcrumb: ReadonlyArray<Crumb>
  actions?: ReactNode
}

export function DetailHeader({ backHref, breadcrumb, actions }: DetailHeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-border bg-background px-6 py-4 lg:px-8">
      <SidebarTrigger className="md:hidden" aria-label="Open menu" />

      <Link
        href={backHref}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-text-2 transition-colors hover:border-neutral-300 hover:text-foreground dark:hover:border-neutral-700"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <nav className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm text-text-2">
        {breadcrumb.map((crumb, i) => (
          <span key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 text-text-4" />}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="transition-colors hover:text-foreground"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="truncate font-medium text-foreground">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </header>
  )
}
