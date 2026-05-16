"use client"

import { ChevronDown, Download, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

// All three of these are visual scaffolding — no backend endpoints yet for
// custom date ranges or CSV export. Rendered as disabled so the user knows
// they're coming rather than getting silent no-ops on click.

export function DateRangePill({
  label = "Last 30 days",
}: {
  label?: string
}) {
  return (
    <button
      type="button"
      disabled
      title="Custom date ranges aren't available yet"
      className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground opacity-60 transition-colors"
    >
      {label}
      <ChevronDown className="size-3.5 text-text-3" />
    </button>
  )
}

export function ExportButton({ label = "Export" }: { label?: string }) {
  return (
    <Button
      variant="outline"
      size="lg"
      disabled
      title="Export isn't available yet"
      className="h-9 gap-2 rounded-full"
    >
      <Download /> {label}
    </Button>
  )
}

export function PrimaryActionButton({
  label,
  icon = "plus",
}: {
  label: string
  icon?: "plus" | "none"
}) {
  return (
    <Button
      size="lg"
      disabled
      className="h-9 gap-2 rounded-full px-4 shadow-primary"
    >
      {icon === "plus" && <Plus />}
      {label}
    </Button>
  )
}
