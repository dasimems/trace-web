"use client"

import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { OpportunitySource } from "@/lib/enum"

type FilterId = "ALL" | OpportunitySource

const CATEGORIES: ReadonlyArray<{ id: FilterId; label: string }> = [
  { id: "ALL", label: "All" },
  { id: OpportunitySource.LOAN, label: "Loans" },
  { id: OpportunitySource.INVESTMENT, label: "Investments" },
  { id: OpportunitySource.GRANT, label: "Grants" },
]

export type OpportunityFilter = FilterId

type CategoryFilterPillsProps = {
  active: OpportunityFilter
  onChange: (id: OpportunityFilter) => void
}

export function CategoryFilterPills({
  active,
  onChange,
}: CategoryFilterPillsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map((category) => {
        const selected = active === category.id
        return (
          <motion.button
            key={category.id}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(category.id)}
            className={cn(
              "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors",
              selected
                ? "border-lime-500 bg-lime-50 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"
                : "border-border bg-card text-text-2 hover:border-neutral-300 hover:text-foreground dark:hover:border-neutral-700",
            )}
          >
            {category.label}
          </motion.button>
        )
      })}

      <button
        type="button"
        className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Sort: AI match <ChevronDown className="size-3.5 text-text-3" />
      </button>
    </div>
  )
}
