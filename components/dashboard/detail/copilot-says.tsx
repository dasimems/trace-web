import type { ReactNode } from "react"

export function CopilotSays({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-lime-300 bg-lime-50/40 dark:border-lime-500/40 dark:bg-lime-500/5">
      <div className="bg-neutral-950 px-4 py-2">
        <span className="ai-badge">Copilot says</span>
      </div>
      <div className="px-4 py-4 text-sm leading-relaxed text-text-2">
        {children}
      </div>
    </div>
  )
}
