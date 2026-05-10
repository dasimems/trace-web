"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  SIGN_UP_STEPS,
  type SignUpStepId,
  getStepIndex,
} from "@/components/auth/sign-up-steps"

export function SignUpStepper({ current }: { current: SignUpStepId }) {
  const currentIndex = getStepIndex(current)
  return (
    <ol className="space-y-5">
      {SIGN_UP_STEPS.map((step, i) => {
        const state =
          i < currentIndex ? "done" : i === currentIndex ? "current" : "todo"
        return (
          <li key={step.id} className="flex items-center gap-3">
            <StepDot index={i} state={state} />
            <span
              className={cn(
                "text-sm transition-colors",
                state === "current" && "font-semibold text-foreground",
                state === "done" && "font-medium text-foreground",
                state === "todo" && "text-text-3",
              )}
            >
              {step.label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function StepDot({
  index,
  state,
}: {
  index: number
  state: "done" | "current" | "todo"
}) {
  if (state === "done") {
    return (
      <span className="flex size-7 items-center justify-center rounded-full bg-lime-500 text-white">
        <Check className="size-3.5" />
      </span>
    )
  }
  if (state === "current") {
    return (
      <motion.span
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="flex size-7 items-center justify-center rounded-full border border-lime-500 font-mono text-xs font-semibold text-lime-600 dark:text-lime-400"
      >
        {index + 1}
      </motion.span>
    )
  }
  return (
    <span className="flex size-7 items-center justify-center rounded-full border border-border font-mono text-xs text-text-3">
      {index + 1}
    </span>
  )
}
