"use client"

import { motion } from "motion/react"
import { Copy, Share2 } from "lucide-react"

import { LogoMark } from "@/components/landing/logo-mark"

function formatAccountNumber(raw: string): { head: string; tail: string } {
  const digits = raw.replace(/\D/g, "").padEnd(10, "0").slice(0, 10)
  const grouped = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`
  return { head: grouped.slice(0, -1), tail: grouped.slice(-1) }
}

export function OverviewBankCard() {
  const { head, tail } = formatAccountNumber("8024567192")
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative col-span-12 overflow-hidden rounded-2xl bg-neutral-950 p-5 text-white shadow-[0_30px_60px_-20px_rgba(15,17,15,0.55)] sm:p-6 xl:col-span-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-lime-500/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_30%,rgba(224,24,91,0.18),transparent_55%)]"
      />

      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-sm font-semibold tracking-tight sm:text-base">
            Trace bank · NUBAN
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-neutral-200">
            <span className="size-1.5 rounded-full bg-good-400" />
            Active
          </span>
        </div>
        <span className="font-mono text-[11px] tracking-[0.16em] text-neutral-400">
          Squad / GTCO · 058
        </span>
      </div>

      <div className="relative mt-7">
        <div className="font-mono text-[11px] tracking-[0.16em] text-neutral-400">
          ACCOUNT NUMBER
        </div>
        <div className="mt-2 font-display text-3xl font-semibold tabular-nums tracking-widest text-white sm:text-[44px]">
          {head}
          <span className="text-lime-500">{tail}</span>
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="font-mono text-[11px] tracking-[0.16em] text-neutral-300">
          ADAEZE OKAFOR
        </div>
        <div className="flex items-center gap-2">
          <CardActionButton icon={<Copy className="size-3.5" />} label="Copy" />
          <CardActionButton icon={<Share2 className="size-3.5" />} label="Share" />
        </div>
      </div>
    </motion.div>
  )
}

function CardActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/10 px-3 text-xs font-medium text-white transition-colors hover:bg-white/15"
    >
      {icon}
      {label}
    </button>
  )
}
