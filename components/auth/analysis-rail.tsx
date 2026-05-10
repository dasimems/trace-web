"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export function LivePreviewCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5",
        className,
      )}
    >
      <span className="ai-badge">Live preview</span>
      <p className="mt-3 text-sm leading-relaxed text-text-2">
        &ldquo;Your textile shop pulls in{" "}
        <span className="font-semibold text-foreground">₦340k–₦480k</span>{" "}
        weekly with a clear Friday-Sunday peak. I&rsquo;ll surface 3
        working-capital offers tuned for that cash-flow.&rdquo;
      </p>
    </div>
  )
}

type DetectedSoFarProps = {
  count: number
  caption: string
  className?: string
}

export function DetectedSoFarCard({
  count,
  caption,
  className,
}: DetectedSoFarProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-card",
        className,
      )}
    >
      <div className="text-sm text-text-3">Detected so far</div>
      <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
        {count.toLocaleString()}
      </div>
      <div className="mt-1 text-sm text-text-3">{caption}</div>
      <Sparkline className="mt-4" />
    </div>
  )
}

function Sparkline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 50"
      className={cn("h-12 w-full", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-lime-500)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-lime-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        d="M0 38 L18 34 L36 36 L52 30 L72 32 L90 24 L110 28 L128 22 L148 24 L166 18 L184 14 L202 10 L220 8"
        fill="none"
        stroke="var(--color-lime-500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 38 L18 34 L36 36 L52 30 L72 32 L90 24 L110 28 L128 22 L148 24 L166 18 L184 14 L202 10 L220 8 L220 50 L0 50 Z"
        fill="url(#spark-fill)"
      />
    </svg>
  )
}
