"use client"

import { Button } from "@/components/ui/button"

export function SafeToInvestCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-lime-300 bg-lime-50/40 dark:border-lime-500/40 dark:bg-lime-500/5">
      <div className="bg-neutral-950 px-5 py-3">
        <span className="ai-badge">Safe-to-invest range</span>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-5xl font-semibold tabular-nums leading-none tracking-tight text-foreground">
            ₦35k
          </span>
          <span className="font-display text-3xl font-medium tabular-nums text-text-3 line-through">
            ₦80k
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-text-2">
          This month, without breaking your buffer or skipping a loan
          repayment.
        </p>

        <div className="mt-5">
          <h4 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
            DIVERSIFICATION SUGGESTION
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-text-2">
            You&rsquo;re{" "}
            <span className="font-semibold text-foreground">45%</span>{" "}
            concentrated in MMF. Move the next{" "}
            <span className="font-semibold text-foreground">₦40k</span> into a
            Coop fund and a small Eurobond slice for resilience.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <Button size="lg" className="h-9 rounded-full px-4 shadow-primary">
            Auto-allocate
          </Button>
          <Button variant="outline" size="lg" className="h-9 rounded-full px-4">
            Show options
          </Button>
        </div>
      </div>
    </div>
  )
}
