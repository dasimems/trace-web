"use client"

import { motion } from "motion/react"

import { LogoMark } from "@/components/landing/logo-mark"

type NubanCardProps = {
  accountNumber: string
  accountName: string
  bank: string
  status?: "active" | "pending"
}

function formatAccountNumber(raw: string): { head: string; tail: string } {
  const digits = raw.replace(/\D/g, "").padEnd(10, "0").slice(0, 10)
  const grouped = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`
  return { head: grouped.slice(0, -1), tail: grouped.slice(-1) }
}

export function NubanCard({
  accountNumber,
  accountName,
  bank,
  status = "active",
}: NubanCardProps) {
  const { head, tail } = formatAccountNumber(accountNumber)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden rounded-2xl bg-neutral-950 p-6 text-white shadow-[0_30px_60px_-20px_rgba(15,17,15,0.55)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-lime-500/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(224,24,91,0.18),transparent_55%)]"
      />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-base font-semibold tracking-tight">
            Trace · NUBAN
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-800/80 px-2.5 py-1 font-mono text-[11px] tracking-wide text-neutral-200">
          <span className="size-1.5 rounded-full bg-good-400" />
          Just generated
        </span>
      </div>

      <div className="relative mt-8 space-y-2">
        <div className="font-mono text-[11px] tracking-[0.18em] text-neutral-400">
          ACCOUNT NUMBER
        </div>
        <div className="font-display text-4xl font-semibold tabular-nums tracking-[0.12em] text-white sm:text-[44px]">
          {head}
          <span className="text-lime-500">{tail}</span>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-3 gap-4 font-mono text-[11px] tracking-[0.16em]">
        <div>
          <div className="text-neutral-500">ACCOUNT NAME</div>
          <div className="mt-1 text-sm text-neutral-100">{accountName}</div>
        </div>
        <div>
          <div className="text-neutral-500">BANK</div>
          <div className="mt-1 font-sans text-sm tracking-normal text-neutral-100">
            {bank}
          </div>
        </div>
        <div>
          <div className="text-neutral-500">STATUS</div>
          <div className="mt-1 inline-flex items-center gap-1.5 font-sans text-sm tracking-normal text-neutral-100">
            <span
              className={`size-1.5 rounded-full ${status === "active" ? "bg-good-400" : "bg-warn-400"}`}
            />
            {status === "active" ? "Active" : "Pending"}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
