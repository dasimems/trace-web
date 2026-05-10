"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"

export function CashFlowMini() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display text-xs font-semibold text-foreground">
          Weekly free cash vs repayment · 12 weeks
        </h4>
        <Badge variant="good" className="h-6 px-2.5 text-[11px]">
          92% confident
        </Badge>
      </div>

      <svg
        viewBox="0 0 320 70"
        className="mt-3 h-16 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="copilot-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-lime-500)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-lime-500)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 50 L26 44 L52 48 L78 38 L106 42 L132 32 L160 36 L186 26 L214 22 L240 14 L268 18 L296 10 L320 8 L320 70 L0 70 Z"
          fill="url(#copilot-fill)"
        />
        <motion.path
          d="M0 50 L26 44 L52 48 L78 38 L106 42 L132 32 L160 36 L186 26 L214 22 L240 14 L268 18 L296 10 L320 8"
          fill="none"
          stroke="var(--color-lime-500)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />
      </svg>
    </div>
  )
}
