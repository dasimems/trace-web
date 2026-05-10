"use client"

import { motion } from "motion/react"
import {
  AlignLeft,
  Hash,
  Building2,
  MessageSquare,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: AlignLeft,
    title: "Transaction intelligence",
    description:
      "Every credit and debit is parsed, categorised and scored against your goals.",
  },
  {
    icon: Hash,
    title: "Opportunity marketplace",
    description:
      "Loans, grants and investments matched to your live cashflow profile.",
  },
  {
    icon: Building2,
    title: "Tiered loan engine",
    description:
      "Bronze to Platinum tiers unlock as your Trace health score climbs.",
  },
  {
    icon: MessageSquare,
    title: "Copilot chat",
    description:
      "Ask anything — Trace explains spend, flags risks, drafts your next move.",
  },
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const { icon: Icon, title, description } = feature
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-lime-300"
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-lime-50 text-lime-500 transition-colors group-hover:bg-lime-100 dark:bg-lime-500/15 dark:text-lime-400">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-2">{description}</p>
    </motion.div>
  )
}

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  )
}
