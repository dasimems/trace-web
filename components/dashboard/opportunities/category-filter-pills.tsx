"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type CategoryId =
  | "all"
  | "loans"
  | "investments"
  | "grants"
  | "side-income"
  | "partnerships"
  | "savings"

const CATEGORIES: ReadonlyArray<{ id: CategoryId; label: string }> = [
  { id: "all",          label: "All"           },
  { id: "loans",        label: "Loans"         },
  { id: "investments",  label: "Investments"   },
  { id: "grants",       label: "Grants"        },
  { id: "side-income",  label: "Side income"   },
  { id: "partnerships", label: "Partnerships"  },
  { id: "savings",      label: "Savings"       },
]

export function CategoryFilterPills() {
  const [active, setActive] = useState<CategoryId>("all")
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map((category) => {
        const selected = active === category.id
        return (
          <motion.button
            key={category.id}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive(category.id)}
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
