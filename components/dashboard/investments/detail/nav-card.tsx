"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"

export function NavPerUnitCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="text-sm text-text-3">NAV · per unit</div>
      <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
        ₦1,184.32
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Badge variant="good" className="h-6 px-2.5 text-[11px]">
          ↑ 0.42% today
        </Badge>
        <span className="text-xs text-text-3">Last priced 6m ago</span>
      </div>

      <NavSparkline className="mt-4" />
    </div>
  )
}

function NavSparkline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 50"
      className={`h-12 w-full ${className ?? ""}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="nav-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-good-500)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-good-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 36 L24 34 L48 32 L72 30 L96 28 L120 26 L144 22 L168 18 L192 16 L216 12 L240 8 L240 50 L0 50 Z"
        fill="url(#nav-fill)"
      />
      <motion.path
        d="M0 36 L24 34 L48 32 L72 30 L96 28 L120 26 L144 22 L168 18 L192 16 L216 12 L240 8"
        fill="none"
        stroke="var(--color-good-500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      />
    </svg>
  )
}
