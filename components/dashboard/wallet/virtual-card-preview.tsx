"use client"

import { motion } from "motion/react"
import { Eye, Plus, Settings2, Snowflake } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const CARD_ACTIONS = [
  { label: "Freeze",   icon: Snowflake  },
  { label: "Limits",   icon: Settings2  },
  { label: "Show CVV", icon: Eye        },
] as const

export function VirtualCardPreview() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">
          Cards
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 rounded-full px-3 text-xs"
        >
          <Plus />
          New card
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mt-4 overflow-hidden rounded-2xl bg-neutral-950 p-5 text-white shadow-[0_20px_40px_-16px_rgba(15,17,15,0.55)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime-500/35 blur-3xl"
        />
        <div className="relative flex items-center justify-between font-mono text-[11px] tracking-wider text-neutral-400">
          <span>
            Virtual ·{" "}
            <span className="font-display text-sm font-semibold tracking-tight text-white">
              Verve
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-good-300">
            <span className="size-1.5 rounded-full bg-good-400" />
            Active
          </span>
        </div>

        <div className="relative mt-6 font-mono text-lg tracking-[0.18em] text-neutral-100">
          5061 <span className="px-1 text-neutral-500">···</span> ···{" "}
          <span className="px-1 text-neutral-500">···</span> 7821
        </div>

        <div className="relative mt-5 flex items-end justify-between font-mono text-[11px] tracking-[0.16em] text-neutral-400">
          <div className="text-sm tracking-wider text-neutral-100">
            ADAEZE OKAFOR
          </div>
          <div>EXP 09/29</div>
        </div>
      </motion.div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CARD_ACTIONS.map((action) => (
          <CardActionButton key={action.label} icon={action.icon} label={action.label} />
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center gap-2 rounded-xl border border-dashed border-border bg-card/60 px-4 py-3 text-sm text-text-2 transition-colors hover:border-lime-300 hover:text-foreground"
      >
        <Plus className="size-4 text-text-3" />
        Order physical Mastercard · ₦1,000
      </button>
    </div>
  )
}

function CardActionButton({
  icon: Icon,
  label,
}: {
  icon: LucideIcon
  label: string
}) {
  return (
    <Button variant="outline" size="lg" className="h-9 gap-1.5 rounded-full px-3.5">
      <Icon /> {label}
    </Button>
  )
}
