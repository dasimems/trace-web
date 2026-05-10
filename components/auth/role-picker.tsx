"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export type RoleId =
  | "trader"
  | "freelancer"
  | "salary"
  | "student"
  | "small-business"

type Role = { id: RoleId; label: string }

const ROLES: readonly Role[] = [
  { id: "trader",         label: "Trader / shop owner" },
  { id: "freelancer",     label: "Freelancer" },
  { id: "salary",         label: "Salary earner" },
  { id: "student",        label: "Student hustler" },
  { id: "small-business", label: "Small business owner" },
] as const

type RolePickerProps = {
  value: RoleId | null
  onChange: (id: RoleId) => void
  name?: string
}

export function RolePicker({ value, onChange, name }: RolePickerProps) {
  return (
    <div role="radiogroup" aria-label="What kind of earner are you?">
      <div className="flex flex-wrap gap-2">
        {ROLES.map((role) => {
          const selected = value === role.id
          return (
            <motion.button
              key={role.id}
              type="button"
              role="radio"
              aria-checked={selected}
              data-state={selected ? "on" : "off"}
              onClick={() => onChange(role.id)}
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
              {role.label}
            </motion.button>
          )
        })}
      </div>
      {name && <input type="hidden" name={name} value={value ?? ""} />}
    </div>
  )
}
