"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { GaugeMeter } from "@/components/auth/gauge-meter"

const TAGS = [
  { label: "Stable income", tone: "lime"  },
  { label: "Low debt",      tone: "lime"  },
  { label: "Food spike",    tone: "warn"  },
] as const

export function FinancialHealthCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="col-span-12 rounded-2xl border border-border bg-card p-5 shadow-card sm:col-span-6 lg:col-span-3"
    >
      <div className="flex items-start justify-between">
        <div className="text-sm text-text-3">Financial health</div>
        <Badge variant="good" className="h-6 px-2 text-[11px]">
          +4 this week
        </Badge>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="flex-1">
          <div className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Strong
          </div>
          <div className="mt-1 text-xs text-text-3">Top 14% in your segment</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {TAGS.map((tag) => (
              <Badge
                key={tag.label}
                variant={tag.tone}
                className="h-5 px-2 text-[10px]"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="-mb-3 -mr-2 w-[110px] shrink-0">
          <GaugeMeter score={82} />
        </div>
      </div>
    </motion.div>
  )
}
