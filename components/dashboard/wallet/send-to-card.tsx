"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

type Recent = {
  initials: string
  name: string
  bank: string
  account: string
}

const RECENTS: ReadonlyArray<Recent> = [
  { initials: "AI", name: "Adaobi Ifeanyi",   bank: "Opay",   account: "8138 ··· 21" },
  { initials: "MC", name: "Mama Caro Foods",  bank: "GTBank", account: "0241 ··· 17" },
  { initials: "TS", name: "Tunde @ Squad POS", bank: "Trace",  account: "8014 ··· 88" },
  { initials: "LT", name: "Lagos Trader Coop", bank: "Wema",   account: "0117 ··· 39" },
]

export function SendToCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Send to
        </h3>
        <span className="text-right text-[11px] text-text-3">
          NIP across all banks · ₦25 fee
        </span>
      </div>

      <label className="mt-4 flex h-10 items-center rounded-full border border-border bg-background/50 px-4 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
        <Search className="size-4 shrink-0 text-text-3" />
        <input
          type="search"
          placeholder="Search a name, NUBAN or @trace handle"
          className="ml-2 h-full flex-1 bg-transparent text-sm outline-none placeholder:text-text-3"
        />
      </label>

      <div className="mt-4 font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
        RECENTS
      </div>

      <ul className="mt-3 divide-y divide-border">
        {RECENTS.map((recent) => (
          <li key={recent.name} className="flex items-center gap-3 py-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-text-2">
              {recent.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">
                {recent.name}
              </div>
              <div className="truncate text-xs text-text-3">
                {recent.bank} · {recent.account}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-full px-3.5 text-xs"
            >
              Send
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
