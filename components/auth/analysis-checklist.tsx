"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type StepStatus = "done" | "active" | "todo"

export type AnalysisStep = {
  title: string
  detail: string
  status: StepStatus
}

type AnalysisChecklistProps = {
  steps: ReadonlyArray<AnalysisStep>
}

export function AnalysisChecklist({ steps }: AnalysisChecklistProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <ul className="divide-y divide-border">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >
            <StepIndicator status={step.status} index={i} />
            <div className="min-w-0 flex-1">
              <div
                className={cn(
                  "font-display text-sm font-semibold",
                  step.status === "todo" ? "text-text-3" : "text-foreground",
                )}
              >
                {step.title}
              </div>
              <div className="mt-0.5 font-mono text-xs text-text-3">
                {step.detail}
              </div>
            </div>
            {step.status === "active" && <WorkingPill />}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StepIndicator({
  status,
  index,
}: {
  status: StepStatus
  index: number
}) {
  if (status === "done") {
    return (
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600 dark:bg-lime-500/20 dark:text-lime-300">
        <Check className="size-4" />
      </span>
    )
  }
  if (status === "active") {
    return (
      <motion.span
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-500/20"
      >
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="size-2.5 rounded-full bg-lime-500"
        />
      </motion.span>
    )
  }
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-text-4">
      <span className="sr-only">Step {index + 1} pending</span>
    </span>
  )
}

function WorkingPill() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-neutral-950 px-2.5 py-1 font-mono text-[11px] tracking-wide text-white">
      <motion.span
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="size-1.5 rounded-full bg-lime-500"
      />
      Working
    </span>
  )
}
