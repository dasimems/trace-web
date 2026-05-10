"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function WalletCopilotCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5"
    >
      <span className="ai-badge">Wallet copilot</span>
      <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
        You have ₦42k safe to move into Save.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-2">
        Your Spend balance is{" "}
        <span className="font-semibold text-foreground">65%</span> of wallet —
        typical is 50%. Move{" "}
        <span className="font-semibold text-foreground">₦42k</span> into Save
        to earn{" "}
        <span className="font-semibold text-lime-600 dark:text-lime-400">
          13.2% p.a.
        </span>{" "}
        while staying liquid for the next IKEDC bill (Friday).
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <Button size="lg" className="h-9 rounded-full px-4 shadow-primary">
          Auto-move ₦42k <ArrowRight />
        </Button>
        <Button variant="outline" size="lg" className="h-9 rounded-full px-4">
          See breakdown
        </Button>
      </div>
    </motion.div>
  )
}
