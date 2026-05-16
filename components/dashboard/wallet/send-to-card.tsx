"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getRecentRecipients, type TRecentRecipient } from "@/api/wallet"
import useWalletActionsStore from "@/stores/wallet-actions-store"

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function maskedAccount(raw: string): string {
  if (raw.length < 4) return raw
  return `${raw.slice(0, 4)} ··· ${raw.slice(-2)}`
}

function bankLabel(r: TRecentRecipient): string {
  return r.bankName ?? r.bankCode ?? "Bank"
}

export function SendToCard() {
  const { data, isLoading, error } = useEndpoint(
    "/wallet/recipients",
    getRecentRecipients,
  )
  const recents = data ?? []
  const openSend = useWalletActionsStore((s) => s.openSend)

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

      {recents.length === 0 ? (
        isLoading ? (
          <RecentsSkeleton />
        ) : error ? (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-3 text-sm text-text-3">
            Recent recipients will show up here after your first transfer.
          </p>
        )
      ) : (
        <ul className="mt-3 divide-y divide-border">
          {recents.map((recent) => (
            <li
              key={`${recent.accountNumber}-${recent.bankCode ?? "x"}`}
              className="flex items-center gap-3 py-2.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-text-2">
                {initialsFor(recent.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  {recent.name}
                </div>
                <div className="truncate text-xs text-text-3">
                  {bankLabel(recent)} · {maskedAccount(recent.accountNumber)}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full px-3.5 text-xs"
                onClick={() => openSend(recent)}
              >
                Send
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RecentsSkeleton() {
  return (
    <ul className="mt-3 divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 py-2.5">
          <Skeleton className="size-9 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-14 rounded-full" />
        </li>
      ))}
    </ul>
  )
}
