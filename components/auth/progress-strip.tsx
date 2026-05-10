"use client"

import { motion } from "motion/react"

type ProgressStripProps = {
  current: number
  total: number
}

export function ProgressStrip({ current, total }: ProgressStripProps) {
  const percent = Math.min(100, Math.max(0, (current / total) * 100))
  return (
    <div className="space-y-2">
      <div className="font-mono text-xs tracking-wide text-text-2">
        Step {current} of {total}
      </div>
      <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full bg-lime-500"
        />
      </div>
    </div>
  )
}
