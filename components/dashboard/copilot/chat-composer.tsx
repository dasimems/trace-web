"use client"

import { Send, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

const SUGGESTIONS = [
  "Why did my score drop?",
  "Show this month vs last",
  "Best time to invest ₦100k",
  "Reduce my food spend",
] as const

export function ChatComposer() {
  return (
    <div className="space-y-3 border-t border-border bg-background pt-4">
      <ul className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              className="inline-flex h-8 items-center rounded-full border border-border bg-card px-3.5 text-xs text-text-2 transition-colors hover:border-lime-300 hover:text-foreground"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      <form
        action="#"
        onSubmit={(e) => e.preventDefault()}
        className="flex h-12 items-center gap-2 rounded-full border border-border bg-card pl-4 pr-1 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
      >
        <Sparkles className="size-4 shrink-0 text-lime-500" />
        <input
          type="text"
          placeholder="Ask Copilot anything · 'Should I take the AfDB grant or the SquadCapital loan?'"
          className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-text-3"
        />
        <Button size="lg" className="h-9 rounded-full px-4 shadow-primary">
          <Send /> Send
        </Button>
      </form>
    </div>
  )
}
