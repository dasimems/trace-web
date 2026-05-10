import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AiInsightCardProps = {
  title: string
  body: React.ReactNode
  ctaLabel: string
  ctaHref?: string
  className?: string
}

export function AiInsightCard({
  title,
  body,
  ctaLabel,
  ctaHref = "#",
  className,
}: AiInsightCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5",
        className,
      )}
    >
      <span className="ai-badge">AI insight</span>
      <h4 className="mt-3 font-display text-base font-semibold leading-snug text-foreground">
        {title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-text-2">{body}</p>
      <Button
        asChild
        variant="lime-outline"
        size="lg"
        className="mt-4 h-9 rounded-full px-4"
      >
        <a href={ctaHref}>
          {ctaLabel} <ArrowRight />
        </a>
      </Button>
    </div>
  )
}
