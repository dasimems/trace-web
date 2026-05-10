"use client"

import { motion } from "motion/react"

type GaugeMeterProps = {
  score: number
  label?: string
}

export function GaugeMeter({ score, label = "AI TRUST" }: GaugeMeterProps) {
  const clamped = Math.min(100, Math.max(0, score))
  return (
    <div className="relative w-[180px]">
      <svg viewBox="0 0 200 130" className="w-full" aria-hidden>
        <defs>
          <linearGradient id="gauge-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--color-good-500)" />
            <stop offset="55%" stopColor="var(--color-warn-500)" />
            <stop offset="100%" stopColor="var(--color-bad-500)" />
          </linearGradient>
        </defs>
        <path
          d="M 14 100 A 86 86 0 0 1 186 100"
          fill="none"
          stroke="var(--color-neutral-200)"
          strokeWidth="16"
          strokeLinecap="round"
          className="dark:stroke-neutral-800"
        />
        <motion.path
          d="M 14 100 A 86 86 0 0 1 186 100"
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: clamped / 100 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-2 text-center">
        <div className="font-display text-3xl font-semibold tabular-nums text-foreground">
          {clamped}
        </div>
        <div className="mt-0.5 font-mono text-[10px] font-medium tracking-[0.16em] text-text-3">
          {label}
        </div>
      </div>
    </div>
  )
}
