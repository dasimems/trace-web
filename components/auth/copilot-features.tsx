"use client"

import { motion } from "motion/react"
import { Zap } from "lucide-react"

type Feature = {
  title: string
  description: string
}

const FEATURES: ReadonlyArray<Feature> = [
  {
    title: "Weekly Money Mondays",
    description: "A 5-minute summary in your inbox.",
  },
  {
    title: "Spending guards",
    description: "Pings if a category breaks pattern.",
  },
  {
    title: "Opportunity radar",
    description: "New matches the moment they fit you.",
  },
  {
    title: "Repayment coach",
    description: "So your tier never slips backward.",
  },
]

export function CopilotFeatures() {
  return (
    <section className="space-y-4">
      <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        WHAT COPILOT WILL DO FOR YOU, EVERY WEEK
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card p-4 shadow-card transition-colors hover:border-lime-300"
    >
      <Zap className="size-4 text-lime-500" />
      <div className="mt-3 font-display text-sm font-semibold leading-snug text-foreground">
        {feature.title}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-text-2">
        {feature.description}
      </p>
    </motion.div>
  )
}
