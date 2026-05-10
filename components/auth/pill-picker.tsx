"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export type PillOption<T extends string> = {
  id: T
  label: string
  hint?: string
}

type PillPickerProps<T extends string> = {
  options: ReadonlyArray<PillOption<T>>
  value: T | null
  onChange: (id: T) => void
  ariaLabel: string
  name?: string
}

export function PillPicker<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  name,
}: PillPickerProps<T>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel}>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.id
          return (
            <motion.button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              data-state={selected ? "on" : "off"}
              onClick={() => onChange(option.id)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className={cn(
                "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                selected
                  ? "border-lime-500 bg-lime-50 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"
                  : "border-border bg-card text-text-2 hover:border-neutral-300 hover:text-foreground dark:hover:border-neutral-700",
              )}
            >
              {option.label}
            </motion.button>
          )
        })}
      </div>
      {name && <input type="hidden" name={name} value={value ?? ""} />}
    </div>
  )
}
