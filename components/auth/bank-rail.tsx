import { Check, Link2 } from "lucide-react"

import { cn } from "@/lib/utils"

const INCLUDED_ITEMS = [
  "Real NUBAN account number — receive money from any Nigerian bank",
  "Free virtual debit card · ATM card on request (₦1,000)",
  "Wallet with sub-balances: Spend · Save · Goals",
  "Instant transfers within Trace · NIP transfers to other banks",
  "NDIC-insured up to ₦5,000,000",
] as const

const NO_FEES_LINE = "No monthly fees · no maintenance charge · no SMS fee"

export function WhyTraceBank({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5",
        className,
      )}
    >
      <span className="ai-badge">Why we open a bank for you</span>
      <p className="mt-3 text-sm leading-relaxed text-text-2">
        One Trace account replaces the &ldquo;link 4 banks&rdquo; dance. Every
        transfer, salary credit and POS settlement lands here — so Copilot has
        a complete picture from day one and you unlock{" "}
        <span className="font-semibold text-foreground">all 4 loan tiers</span>{" "}
        faster.
      </p>
    </div>
  )
}

export function IncludedFromStart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-card",
        className,
      )}
    >
      <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        INCLUDED FROM THE START
      </h3>
      <ul className="mt-4 space-y-3">
        {INCLUDED_ITEMS.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
            <Check className="mt-0.5 size-4 shrink-0 text-lime-500" />
            <span className="text-text-2">{item}</span>
          </li>
        ))}
        <li className="flex gap-2.5 text-sm leading-relaxed">
          <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center font-display text-sm font-semibold text-lime-500 line-through">
            ₦
          </span>
          <span className="text-text-2">{NO_FEES_LINE}</span>
        </li>
      </ul>
    </div>
  )
}

export function AlreadyBankElsewhere({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-card",
        className,
      )}
    >
      <div className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
        <Link2 className="size-4" />
        Already bank elsewhere?
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-2">
        You can still link a GTBank, Opay or Kuda account later — Trace will
        keep parsing transactions from there too.
      </p>
    </div>
  )
}
