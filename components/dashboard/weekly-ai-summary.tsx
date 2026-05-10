"use client"

import { motion } from "motion/react"
import { ArrowRight, AlertCircle, Check, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BulletTone = "good" | "warn" | "lime"

type Bullet = {
  icon: LucideIcon
  tone: BulletTone
  text: React.ReactNode
}

const BULLETS: ReadonlyArray<Bullet> = [
  {
    icon: Check,
    tone: "good",
    text: <>You safely saved ₦40k of your ₦42k target</>,
  },
  {
    icon: AlertCircle,
    tone: "warn",
    text: <>Food category breached its 8-week average</>,
  },
  {
    icon: Star,
    tone: "lime",
    text: <>You unlocked Gold loan tier — see new offers</>,
  },
]

const BULLET_BG: Record<BulletTone, string> = {
  good: "bg-good-100 text-good-700 dark:bg-good-500/20 dark:text-good-300",
  warn: "bg-warn-100 text-warn-700 dark:bg-warn-500/20 dark:text-warn-300",
  lime: "bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300",
}

export function WeeklyAiSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
      className="rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="ai-badge">Weekly AI summary</span>
        <span className="font-mono text-[11px] tracking-wide text-text-3">
          Generated 6m ago
        </span>
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
        You&rsquo;re trending up — but watch the food line.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-2">
        Income rose <span className="font-semibold text-foreground">18%</span>{" "}
        with a clean Friday-Sunday peak. Food spend climbed{" "}
        <span className="font-semibold text-warn-600 dark:text-warn-400">
          18%
        </span>{" "}
        — mostly Chowdeck after 8pm.
      </p>

      <ul className="mt-5 space-y-3">
        {BULLETS.map((bullet, i) => {
          const Icon = bullet.icon
          return (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  BULLET_BG[bullet.tone],
                )}
              >
                <Icon className="size-3" />
              </span>
              <span className="text-text-2">{bullet.text}</span>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <Button size="lg" className="h-9 rounded-full px-4 shadow-primary">
          Talk to Copilot <ArrowRight />
        </Button>
        <Button variant="outline" size="lg" className="h-9 rounded-full px-4">
          Read full report
        </Button>
      </div>
    </motion.div>
  )
}
