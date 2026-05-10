"use client"

import { ChevronDown, Download, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DateRangePill({
  label = "Last 30 days",
}: {
  label?: string
}) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      {label}
      <ChevronDown className="size-3.5 text-text-3" />
    </button>
  )
}

export function ExportButton({ label = "Export" }: { label?: string }) {
  return (
    <Button variant="outline" size="lg" className="h-9 gap-2 rounded-full">
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
    <Button size="lg" className="h-9 gap-2 rounded-full px-4 shadow-primary">
      {icon === "plus" && <Plus />}
      {label}
    </Button>
  )
}
