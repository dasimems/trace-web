"use client"

import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type RecTone = "warn" | "info" | "good"

type Recommendation = {
  tag: { label: string; tone: RecTone }
  title: string
  detail: string
  href: string
}

const RECOMMENDATIONS: ReadonlyArray<Recommendation> = [
  {
    tag: { label: "Save", tone: "warn" },
    title: "Move ₦25k into MMF",
    detail: "Earn ~13% p.a. while liquid",
    href: "/app/investments",
  },
  {
    tag: { label: "Spend", tone: "warn" },
    title: "Cap food at ₦95k",
    detail: "Aligns with your 8-week median",
    href: "/app/transactions?category=food",
  },
  {
    tag: { label: "Grow", tone: "info" },
    title: "Apply for Gold loan",
    detail: "₦1.8M @ 14.5% for working capital",
    href: "/app/loans",
  },
  {
    tag: { label: "Earn", tone: "good" },
    title: "Refer 3 traders",
    detail: "Earn ₦8k bonus + boost score",
    href: "/app/copilot",
  },
]

export function SmartRecommendationsCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Smart recommendations
      </h3>

      <ul className="mt-3 divide-y divide-border">
        {RECOMMENDATIONS.map((rec) => (
          <li key={rec.title}>
            <a
              href={rec.href}
              className="group flex items-center gap-3 py-3 transition-colors hover:text-foreground"
            >
              <Badge variant={rec.tag.tone} className="h-6 px-2.5 text-[11px]">
                {rec.tag.label}
              </Badge>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  {rec.title}
                </div>
                <div className="truncate text-xs text-text-3">{rec.detail}</div>
              </div>
              <ArrowRight className="size-4 shrink-0 text-text-3 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
