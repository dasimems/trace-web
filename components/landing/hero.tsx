"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TraceCard } from "@/components/landing/trace-card"

function CornerBracket({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br"
}) {
  const placement = {
    tl: "top-3 left-3",
    tr: "top-3 right-3 rotate-90",
    bl: "bottom-3 left-3 -rotate-90",
    br: "bottom-3 right-3 rotate-180",
  }[position]
  return (
    <span aria-hidden className={`absolute ${placement} block size-5`}>
      <span className="absolute inset-y-0 left-0 w-px bg-lime-400/70" />
      <span className="absolute inset-x-0 top-0 h-px bg-lime-400/70" />
    </span>
  )
}

function TelemetryStrip() {
  return (
    <div className="relative flex items-center gap-3 font-mono text-[11px] tracking-wider text-lime-600 dark:text-lime-400">
      <span>TRACE://OS.V1.4</span>
      <span className="text-text-4">·</span>
      <span>LAGOS-01</span>
      <span className="text-lime-500">·</span>
      <motion.span
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-1.5"
      >
        <span className="dot bg-lime-500" />
        SIGNAL · LIVE
      </motion.span>
      <span className="ml-2 hidden h-px flex-1 bg-gradient-to-r from-lime-300/60 to-transparent sm:block" />
    </div>
  )
}

function TrajectoryStrip() {
  return (
    <div className="hidden items-center justify-end gap-3 font-mono text-[11px] tracking-wider text-text-3 lg:flex">
      <span>// TRAJECTORY · WK 01 → WK 48</span>
      <span className="flex items-center gap-1.5 text-lime-600 dark:text-lime-400">
        <span className="dot bg-lime-500" />
        +₦1.6M PROJECTED
      </span>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient page glow — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-lime-200/40 blur-3xl dark:bg-lime-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[420px] rounded-full bg-lime-100/60 blur-3xl dark:bg-lime-500/5"
      />

      {/* decorative bracketed frame */}
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16">
        <div className="relative">
          <CornerBracket position="tl" />
          <CornerBracket position="tr" />

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="px-3 pt-8 sm:px-6 sm:pt-10"
          >
            <TelemetryStrip />
            <div className="mt-6">
              <TrajectoryStrip />
            </div>
          </motion.div>

          <div className="grid gap-10 px-3 pt-10 sm:px-6 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-6 lg:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-[78px]">
                A financial OS
                <br />
                for{" "}
                <span className="relative inline-block text-lime-500">
                  hustlers
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-px bg-lime-400/70"
                  />
                </span>{" "}
                &amp;
                <br />
                small business.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-text-2 sm:text-lg">
                Open a Trace bank account in seconds. Every transaction is
                parsed in real-time and routed to the loans, grants and
                investments you actually qualify for.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-5 shadow-primary"
                >
                  <a href="/auth/sign-up">
                    Open my Trace account <ArrowRight />
                  </a>
                </Button>
                <a
                  href="#demo"
                  className="text-sm text-text-2 underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  or watch the 90s demo
                </a>
              </div>
            </motion.div>

            <div className="relative">
              <TraceCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
