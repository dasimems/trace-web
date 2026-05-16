"use client"

import { useState } from "react"
import { Send, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const SUGGESTIONS = [
  "Why did my score drop?",
  "Show this month vs last",
  "Best time to invest ₦100k",
  "Reduce my food spend",
] as const

type ChatComposerProps = {
  onSubmit: (content: string) => Promise<void> | void
  isSending: boolean
}

export function ChatComposer({ onSubmit, isSending }: ChatComposerProps) {
  const [value, setValue] = useState("")

  async function submit(content: string) {
    const trimmed = content.trim()
    if (!trimmed || isSending) return
    await onSubmit(trimmed)
    setValue("")
  }

  return (
    <div className="space-y-3 border-t border-border bg-background pt-4">
      <ul className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              disabled={isSending}
              onClick={() => submit(s)}
              className="inline-flex h-8 items-center rounded-full border border-border bg-card px-3.5 text-xs text-text-2 transition-colors hover:border-lime-300 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
        className="flex h-12 items-center gap-2 rounded-full border border-border bg-card pl-4 pr-1 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
      >
        <Sparkles className="size-4 shrink-0 text-lime-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isSending}
          placeholder="Ask Copilot anything · 'Should I take the AfDB grant or the SquadCapital loan?'"
          className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-text-3 disabled:cursor-not-allowed"
        />
        <Button
          type="submit"
          size="lg"
          disabled={isSending || !value.trim()}
          className="h-9 rounded-full px-4 shadow-primary"
        >
          {isSending ? <Spinner /> : <Send />} {isSending ? "Sending" : "Send"}
        </Button>
      </form>
    </div>
  )
}
