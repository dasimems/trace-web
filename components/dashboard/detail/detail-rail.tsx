"use client"

import type { ReactNode } from "react"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

type DetailRailProps = {
  /** Mono header (APPLY / ALLOCATE). */
  label: string
  /** Hero number (e.g. ₦1,200,000 or ₦70,440). */
  hero: string
  /** Sub-line under hero (e.g. "net of ₦12,000 origination"). */
  heroCaption: string
  /** Stat rows shown below the hero. */
  stats: ReadonlyArray<{ label: string; value: ReactNode }>
  /** Pink-bordered "Copilot says" insight body. */
  copilotInsight: ReactNode
  /** Trust line shown below the insight (e.g. "CBN-licensed · NDPR-secured…"). */
  trust: string
  primaryLabel: string
  secondaryLabel: string
  footer: string
}

export function DetailRail({
  label,
  hero,
  heroCaption,
  stats,
  copilotInsight,
  trust,
  primaryLabel,
  secondaryLabel,
  footer,
}: DetailRailProps) {
  return (
    <aside className="space-y-5">
      <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        {label}
      </h3>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="text-sm text-text-3">{stats[0]?.label}</div>
        <div className="mt-1 font-display text-4xl font-semibold tabular-nums tracking-tight text-foreground">
          {hero}
        </div>
        <div className="mt-1 text-xs text-text-3">{heroCaption}</div>

        <ul className="mt-5 space-y-3 border-t border-border pt-4">
          {stats.slice(1).map((stat) => (
            <li
              key={stat.label}
              className="flex items-baseline justify-between gap-3 text-sm"
            >
              <span className="text-text-2">{stat.label}</span>
              <span className="text-right font-display tabular-nums text-foreground">
                {stat.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-2xl border border-lime-300 bg-lime-50/40 dark:border-lime-500/40 dark:bg-lime-500/5">
        <div className="bg-neutral-950 px-4 py-2">
          <span className="ai-badge">Copilot says</span>
        </div>
        <div className="px-4 py-4 text-sm leading-relaxed text-text-2">
          {copilotInsight}
        </div>
      </div>

      <p className="flex items-start gap-2 text-xs text-text-3">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0" />
        {trust}
      </p>

      <div className="space-y-2">
        <Button size="lg" className="h-12 w-full rounded-full px-5 text-sm shadow-primary">
          {primaryLabel}
        </Button>
        <Button variant="outline" size="lg" className="h-11 w-full rounded-full px-5 text-sm">
          {secondaryLabel}
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-text-3">{footer}</p>
    </aside>
  )
}
