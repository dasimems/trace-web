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
    title: "Real-time transaction intelligence",
    description:
      "Every naira in and out builds your Trace Health Score automatically — no manual input required.",
  },
  {
    icon: Hash,
    title: "AI-matched opportunity marketplace",
    description:
      "Loans, grants and investments ranked by your actual cashflow — not your paperwork.",
  },
  {
    icon: Building2,
    title: "Behaviour-based loan tiers",
    description:
      "Bronze to Platinum — unlocked by how you transact, not who you know.",
  },
  {
    icon: MessageSquare,
    title: "Copilot chat",
    description:
      "Ask anything about your money. Trace explains your spending, flags risks, and tells you exactly what to do next.",
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
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  )
}
