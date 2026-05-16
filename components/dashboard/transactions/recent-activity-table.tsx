"use client"

import { useMemo } from "react"
import {
  AlertTriangle,
  ArrowUpRight,
  ChevronDown,
  MoreHorizontal,
  RefreshCw,
  Search,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  getTransactions,
  type TTransaction,
} from "@/api/transactions"
import { getRecurring } from "@/api/analysis"
import {
  TransactionCategory,
  TransactionDirection,
  TransactionStatus,
} from "@/lib/enum"
import { formatNaira } from "@/lib/money"
import { formatSmartDate } from "@/lib/functions"

type CategoryTone = "warn" | "lime" | "info" | "purple" | "bad" | "muted"

type CaptionKind = "recurring" | "income" | "anomaly" | "ai"

const CATEGORY_META: Record<
  TransactionCategory,
  { label: string; tone: CategoryTone }
> = {
  [TransactionCategory.INCOME]: { label: "Income", tone: "lime" },
  [TransactionCategory.TRANSFER]: { label: "Transfer", tone: "muted" },
  [TransactionCategory.FOOD_AND_DINING]: { label: "Food & dining", tone: "warn" },
  [TransactionCategory.TRANSPORT]: { label: "Transport", tone: "info" },
  [TransactionCategory.BILLS_AND_UTILITIES]: { label: "Bills", tone: "purple" },
  [TransactionCategory.SHOPPING]: { label: "Shopping", tone: "bad" },
  [TransactionCategory.ENTERTAINMENT]: { label: "Lifestyle", tone: "purple" },
  [TransactionCategory.HEALTH]: { label: "Health", tone: "info" },
  [TransactionCategory.EDUCATION]: { label: "Education", tone: "info" },
  [TransactionCategory.SAVINGS]: { label: "Save", tone: "info" },
  [TransactionCategory.INVESTMENT]: { label: "Invest", tone: "info" },
  [TransactionCategory.FEES]: { label: "Fees", tone: "muted" },
  [TransactionCategory.OTHER]: { label: "Other", tone: "muted" },
}

const CAPTION_ICON: Record<CaptionKind, LucideIcon | null> = {
  recurring: RefreshCw,
  income: ArrowUpRight,
  anomaly: AlertTriangle,
  ai: null,
}

const CAPTION_COLOR: Record<CaptionKind, string> = {
  recurring: "text-text-3",
  income: "text-lime-600 dark:text-lime-400",
  anomaly: "text-warn-600 dark:text-warn-400",
  ai: "text-text-3",
}

const CATEGORY_BG: Record<CategoryTone, string> = {
  warn: "bg-warn-50 text-warn-700 border-warn-200 dark:bg-warn-500/15 dark:text-warn-300 dark:border-warn-500/30",
  lime: "bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-500/15 dark:text-lime-300 dark:border-lime-500/30",
  info: "bg-info-50 text-info-700 border-info-200 dark:bg-info-500/15 dark:text-info-300 dark:border-info-500/30",
  purple:
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30",
  bad: "bg-bad-50 text-bad-700 border-bad-200 dark:bg-bad-500/15 dark:text-bad-300 dark:border-bad-500/30",
  muted: "bg-card text-text-2 border-border",
}

function initialsFor(t: TTransaction): string {
  const name =
    t.direction === TransactionDirection.CREDIT
      ? t.senderName
      : t.recipientName
  const source = name?.trim() || t.description?.trim() || t.reference
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function merchantFor(t: TTransaction): string {
  if (t.description) return t.description
  const counter =
    t.direction === TransactionDirection.CREDIT
      ? t.senderName
      : t.recipientName
  if (counter) {
    return `${t.direction === TransactionDirection.CREDIT ? "From" : "To"} ${counter}`
  }
  return CATEGORY_META[t.category]?.label ?? t.reference
}

function channelFor(t: TTransaction): string {
  return (
    (t.direction === TransactionDirection.CREDIT
      ? t.senderBankName
      : t.recipientBankName) ?? t.provider
  )
}

function captionFor(
  t: TTransaction,
  recurringRefs: Set<string>,
): { kind: CaptionKind; text: string } {
  if (t.status === TransactionStatus.FAILED) {
    return { kind: "anomaly", text: "Failed · review" }
  }
  if (recurringRefs.has(t.reference)) {
    return { kind: "recurring", text: "Recurring · detected" }
  }
  if (t.direction === TransactionDirection.CREDIT) {
    return { kind: "income", text: "Income" }
  }
  return { kind: "ai", text: "Auto-tagged" }
}

function signedAmount(t: TTransaction): number {
  return t.direction === TransactionDirection.CREDIT ? t.amount : -t.amount
}

export function RecentActivityTable() {
  const { data, isLoading, error } = useEndpoint("/transactions?recent=true", () =>
    getTransactions({ limit: 12 }),
  )
  const recurringQuery = useEndpoint("/analysis/recurring", getRecurring)

  const transactions = data?.items ?? []
  const recurringCounterparties = useMemo(
    () =>
      new Set<string>(
        recurringQuery.data?.value?.patterns.map((p) => p.counterparty) ?? [],
      ),
    [recurringQuery.data?.value?.patterns],
  )

  const rows = useMemo(
    () =>
      transactions.map((t) => ({
        t,
        caption: captionFor(t, recurringCounterparties),
      })),
    [transactions, recurringCounterparties],
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Recent activity
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Latest
        </Badge>
        <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
          <label className="relative flex h-9 w-full items-center rounded-full border border-border bg-background/50 px-3 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 sm:w-64">
            <Search className="size-3.5 shrink-0 text-text-3" />
            <input
              type="search"
              placeholder="Search merchant, amount…"
              className="ml-2 h-full flex-1 bg-transparent text-sm outline-none placeholder:text-text-3"
            />
          </label>
          <Button variant="outline" size="sm" className="h-9 gap-1 rounded-full px-3 text-xs">
            All categories <ChevronDown />
          </Button>
        </div>
      </div>

      <div className="mt-4 -mx-4 overflow-x-auto sm:-mx-5">
        <div className="min-w-[680px] px-4 sm:px-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-[11px] tracking-[0.16em] text-text-3">
                  MERCHANT
                </TableHead>
                <TableHead className="font-mono text-[11px] tracking-[0.16em] text-text-3">
                  CATEGORY
                </TableHead>
                <TableHead className="font-mono text-[11px] tracking-[0.16em] text-text-3">
                  CHANNEL
                </TableHead>
                <TableHead className="font-mono text-[11px] tracking-[0.16em] text-text-3">
                  DATE
                </TableHead>
                <TableHead className="text-right font-mono text-[11px] tracking-[0.16em] text-text-3">
                  AMOUNT
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && transactions.length === 0 ? (
                <ActivitySkeletonRows />
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-sm text-text-3">
                    {error ?? "No transactions yet."}
                  </TableCell>
                </TableRow>
              ) : (
                rows.map(({ t, caption }) => (
                  <ActivityRow
                    key={t.id}
                    t={t}
                    caption={caption}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function ActivityRow({
  t,
  caption,
}: {
  t: TTransaction
  caption: { kind: CaptionKind; text: string }
}) {
  const Icon = CAPTION_ICON[caption.kind]
  const meta = CATEGORY_META[t.category]
  const amount = signedAmount(t)
  const formatted = `${amount >= 0 ? "+" : "-"}${formatNaira(Math.abs(amount))}`
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-text-2">
            {initialsFor(t)}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {merchantFor(t)}
            </div>
            <div
              className={cn(
                "mt-0.5 flex items-center gap-1 truncate text-xs",
                CAPTION_COLOR[caption.kind],
              )}
            >
              {Icon && <Icon className="size-3" />}
              {caption.text}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span
          className={cn(
            "inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium",
            CATEGORY_BG[meta.tone],
          )}
        >
          {meta.label}
        </span>
      </TableCell>
      <TableCell className="text-sm text-text-2">{channelFor(t)}</TableCell>
      <TableCell className="text-sm text-text-2">
        {formatSmartDate(new Date(t.processedAt ?? t.createdAt))}
      </TableCell>
      <TableCell
        className={cn(
          "text-right font-display text-sm font-semibold tabular-nums",
          amount > 0 ? "text-lime-600 dark:text-lime-400" : "text-foreground",
        )}
      >
        {formatted}
      </TableCell>
      <TableCell>
        {t.status === TransactionStatus.FAILED ? (
          <Badge variant="warn" className="h-7 px-2.5 text-xs">
            Review
          </Badge>
        ) : (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Row actions"
            className="text-text-3"
          >
            <MoreHorizontal />
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}

function ActivitySkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-7 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-24" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="ml-auto h-4 w-20" />
          </TableCell>
          <TableCell />
        </TableRow>
      ))}
    </>
  )
}
