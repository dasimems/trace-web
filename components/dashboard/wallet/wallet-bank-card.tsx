"use client"

import { motion } from "motion/react"
import { Copy, Share2 } from "lucide-react"

import { LogoMark } from "@/components/landing/logo-mark"

function splitAccountNumber(raw: string): { head: string; tail: string } {
  const digits = raw.replace(/\D/g, "").padEnd(10, "0").slice(0, 10)
  const grouped = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`
  return { head: grouped.slice(0, -1), tail: grouped.slice(-1) }
}

export function WalletBankCard() {
  const { head, tail } = splitAccountNumber("8024567192")
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-neutral-950 p-5 text-white shadow-[0_30px_60px_-20px_rgba(15,17,15,0.55)] sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-12 h-60 w-60 rounded-full bg-lime-500/45 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_30%,rgba(224,24,91,0.2),transparent_55%)]"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <LogoMark className="size-9" />
          <div>
            <div className="font-display text-base font-semibold tracking-tight">
              Trace bank
            </div>
            <div className="mt-0.5 font-mono text-[11px] tracking-wider text-neutral-400">
              Powered by Squad / GTCO · 058
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-good-500/15 px-3 py-1 font-mono text-[11px] tracking-wide text-good-300 ring-1 ring-good-500/30">
          <span className="size-1.5 rounded-full bg-good-400" />
          Active · Tier 2
        </span>
      </div>

      <div className="relative mt-9">
        <div className="font-mono text-[11px] tracking-[0.16em] text-neutral-400">
          ACCOUNT NUMBER
        </div>
        <div className="mt-2 font-display text-4xl font-semibold tabular-nums leading-none tracking-[0.08em] text-white sm:text-[56px]">
          {head}
          <span className="text-lime-500">{tail}</span>
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-4 font-mono text-[11px] tracking-[0.16em] sm:mt-8 sm:grid-cols-3">
        <div>
          <div className="text-neutral-500">ACCOUNT NAME</div>
          <div className="mt-1 text-sm tracking-wider text-neutral-100">
            ADAEZE OKAFOR
          </div>
        </div>
        <div>
          <div className="text-neutral-500">OPENED</div>
          <div className="mt-1 font-sans text-sm tracking-normal text-neutral-100">
            09 May 2026
          </div>
        </div>
        <div>
          <div className="text-neutral-500">BVN</div>
          <div className="mt-1 text-sm text-neutral-100">2214 ··· ··78</div>
        </div>
      </div>

      <div className="relative mt-6 flex justify-end gap-2">
        <CardActionButton icon={<Copy className="size-3.5" />} label="Copy" />
        <CardActionButton
          icon={<Share2 className="size-3.5" />}
          label="Share"
        />
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
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
    >
      {icon}
      {label}
    </button>
  )
}
