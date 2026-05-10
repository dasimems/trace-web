"use client"

import { motion } from "motion/react"

function ChipIcon() {
  return (
    <svg
      width="34"
      height="26"
      viewBox="0 0 34 26"
      fill="none"
      aria-hidden
      className="text-neutral-300"
    >
      <rect
        x="0.5"
        y="0.5"
        width="33"
        height="25"
        rx="3.5"
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <path
        d="M0 8 H10 M0 18 H10 M24 8 H34 M24 18 H34 M17 0 V8 M17 18 V26"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      <rect
        x="10"
        y="8"
        width="14"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
    </svg>
  )
}

function ContactlessIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      className="text-neutral-300/70"
    >
      <path
        d="M5 6c2 1.5 3 3.5 3 5s-1 3.5-3 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M9 4c2.5 2 4 4.5 4 7s-1.5 5-4 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M13 2c3 2.5 5 5.5 5 9s-2 6.5-5 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MatchPill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, x: 8 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      className="absolute -top-6 right-2 z-20 rounded-xl bg-neutral-950 px-3.5 py-2.5 text-left shadow-[0_8px_28px_-8px_rgba(15,17,15,0.45)]"
    >
      <div className="font-mono text-[10px] tracking-wider text-lime-400">
        &gt; MATCH · 002
      </div>
      <div className="mt-1 font-display text-sm font-semibold text-white">
        Gold loan · <span className="text-white">₦1.8M</span>{" "}
        <span className="text-neutral-400">@ 3.2%</span>
      </div>
      <div className="mt-0.5 font-mono text-[10px] tracking-wider text-lime-500">
        94% APPROVAL
      </div>
    </motion.div>
  )
}

function HealthWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
      className="absolute -bottom-4 left-2 z-20 w-[170px] rounded-xl bg-neutral-950 p-3 shadow-[0_8px_28px_-8px_rgba(15,17,15,0.45)]"
    >
      <div className="font-mono text-[10px] tracking-wider text-neutral-400">
        HEALTH · 8W
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-2xl font-semibold tabular-nums text-white">
          82
        </span>
        <span className="font-mono text-xs text-neutral-500">/100</span>
        <span className="font-mono text-xs font-medium text-lime-400">+18</span>
      </div>
      <svg
        viewBox="0 0 140 28"
        className="mt-1.5 h-7 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="health-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--color-good-500)" />
            <stop offset="100%" stopColor="var(--color-lime-500)" />
          </linearGradient>
        </defs>
        <path
          d="M0 22 L18 18 L34 21 L52 14 L70 16 L90 9 L110 11 L128 5 L140 4"
          fill="none"
          stroke="url(#health-line)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

export function TraceCard() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] aspect-[1.05/1]">
      {/* ambient glow behind card */}
      <div
        aria-hidden
        className="absolute inset-x-8 bottom-2 h-40 rounded-full bg-good-300/35 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute right-0 top-12 h-44 w-44 rounded-full bg-lime-300/40 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, rotate: 0, y: 20 }}
        animate={{ opacity: 1, rotate: -6, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-12 aspect-[1.586/1] w-[360px] origin-center"
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-950 p-5 text-white shadow-[0_30px_60px_-20px_rgba(15,17,15,0.55)]">
          {/* radial pink glow inside card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-12 h-44 w-44 rounded-full bg-lime-500/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,rgba(224,24,91,0.18),transparent_55%)]"
          />

          <div className="relative flex items-start justify-between">
            <div>
              <div className="font-display text-xl font-semibold tracking-tight">
                Trace
              </div>
              <div className="mt-0.5 font-mono text-[10px] tracking-widest text-neutral-400">
                // VIRTUAL · NGN
              </div>
            </div>
            <ContactlessIcon />
          </div>

          <div className="relative mt-4">
            <ChipIcon />
          </div>

          <div className="relative mt-4 font-mono text-[15px] tracking-[0.2em] text-neutral-100/90">
            8011<span className="px-1.5 text-neutral-500">··</span>4429
            <span className="px-1.5 text-neutral-500">··</span>0156
          </div>

          <div className="relative mt-3 flex items-end justify-between font-mono text-[10px] tracking-widest">
            <div>
              <div className="text-neutral-500">ACCOUNT NAME</div>
              <div className="mt-0.5 text-sm tracking-wide text-neutral-100">
                FATIMA A. · TRACE
              </div>
            </div>
            <div className="text-right">
              <div className="text-neutral-500">NUBAN</div>
              <div className="mt-0.5 text-sm tracking-widest text-lime-500">
                9012 884 217
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <MatchPill />
      <HealthWidget />
    </div>
  )
}
