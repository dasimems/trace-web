"use client"

import { motion } from "motion/react"
import { ShieldCheck } from "lucide-react"

const PARTNERS = [
  { label: "SQUAD API", weight: "font-semibold" },
  { label: "Mono", weight: "font-medium italic" },
  { label: "NIBSS", weight: "font-semibold tracking-wide" },
  { label: "Paystack", weight: "font-medium" },
  { label: "Flutterwave", weight: "font-medium" },
] as const

export function PartnersRow() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-border"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-12 py-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="text-text-3">Powered by</span>
          {PARTNERS.map((p, i) => (
            <span key={p.label} className="flex items-center gap-x-5">
              <span className={`text-foreground ${p.weight}`}>{p.label}</span>
              {i < PARTNERS.length - 1 && (
                <span className="text-lime-500">·</span>
              )}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-text-3">
          <ShieldCheck className="size-4" />
          <span>Bank-grade encryption · Read-only access</span>
        </div>
      </div>
    </motion.section>
  )
}
