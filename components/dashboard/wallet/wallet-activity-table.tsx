"use client"

import { ChevronDown, Download, MoreHorizontal } from "lucide-react"

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
import { getTransactions, type TTransaction } from "@/api/transactions"
import { formatPrice } from "@/lib/money"
import { formatSmartDate } from "@/lib/functions"
import {
  TransactionCategory,
  TransactionDirection,
  TransactionStatus,
} from "@/lib/enum"

type TypeTone = "lime" | "info" | "purple" | "warn" | "muted" | "bad"

type TypeMeta = {
  label: string
  tone: TypeTone
}

const TYPE_META_BY_CATEGORY: Partial<Record<TransactionCategory, TypeMeta>> = {
  [TransactionCategory.INCOME]: { label: "Income", tone: "lime" },
  [TransactionCategory.TRANSFER]: { label: "Transfer", tone: "muted" },
  [TransactionCategory.BILLS_AND_UTILITIES]: { label: "Bills", tone: "warn" },
  [TransactionCategory.FOOD_AND_DINING]: { label: "Food", tone: "warn" },
  [TransactionCategory.TRANSPORT]: { label: "Transport", tone: "info" },
  [TransactionCategory.SHOPPING]: { label: "Shopping", tone: "purple" },
  [TransactionCategory.ENTERTAINMENT]: { label: "Lifestyle", tone: "purple" },
  [TransactionCategory.SAVINGS]: { label: "Save", tone: "info" },
  [TransactionCategory.INVESTMENT]: { label: "Invest", tone: "info" },
  [TransactionCategory.FEES]: { label: "Fees", tone: "muted" },
  [TransactionCategory.HEALTH]: { label: "Health", tone: "good" as TypeTone },
  [TransactionCategory.EDUCATION]: { label: "Education", tone: "info" },
  [TransactionCategory.OTHER]: { label: "Other", tone: "muted" },
}

function typeMetaFor(t: TTransaction): TypeMeta {
  return (
    TYPE_META_BY_CATEGORY[t.category] ?? { label: t.category, tone: "muted" }
  )
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

function descriptionFor(t: TTransaction): string {
  if (t.description) return t.description
  const counter =
    t.direction === TransactionDirection.CREDIT
      ? t.senderName
      : t.recipientName
  if (counter) {
    return `${t.direction === TransactionDirection.CREDIT ? "From" : "To"} ${counter}`
  }
  return typeMetaFor(t).label
}

function captionFor(t: TTransaction): string {
  if (t.direction === TransactionDirection.CREDIT && t.senderBankName) {
    return `${t.senderBankName} · ${t.senderAccountNumber ?? ""}`
  }
  if (t.direction === TransactionDirection.DEBIT && t.recipientBankName) {
    return `${t.recipientBankName} · ${t.recipientAccountNumber ?? ""}`
  }
  return t.status === TransactionStatus.PENDING ? "Pending settlement" : ""
}

function signedAmount(t: TTransaction): number {
  return t.direction === TransactionDirection.CREDIT
    ? t.amount.amount
    : -t.amount.amount
}

export function WalletActivityTable() {
  const { data, isLoading, error } = useEndpoint(
    "/transactions?wallet=true",
    () => getTransactions({ limit: 8 }),
  )

  const transactions = data?.items ?? []

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Wallet activity
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Latest
        </Badge>
        <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
          <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full px-3 text-xs">
            All types <ChevronDown />
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full px-3 text-xs">
            <Download /> Statement
          </Button>
        </div>
      </div>

      <div className="mt-4 -mx-4 overflow-x-auto sm:-mx-5">
        <div className="min-w-[640px] px-4 sm:px-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-[11px] tracking-[0.16em] text-text-3">
                  DESCRIPTION
                </TableHead>
                <TableHead className="font-mono text-[11px] tracking-[0.16em] text-text-3">
                  TYPE
                </TableHead>
                <TableHead className="font-mono text-[11px] tracking-[0.16em] text-text-3">
                  REFERENCE
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
                    {error ?? "No activity yet."}
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((t) => (
                  <ActivityRow key={t.id} t={t} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function ActivityRow({ t }: { t: TTransaction }) {
  const meta = typeMetaFor(t)
  const amount = signedAmount(t)
  const formatted = `${amount >= 0 ? "+" : "-"}${formatPrice(t.amount)}`
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-text-2">
            {initialsFor(t)}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {descriptionFor(t)}
            </div>
            <div className="truncate text-xs text-text-3">{captionFor(t)}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={meta.tone === "muted" ? "outline" : meta.tone}
          className="h-6 px-2.5 text-[11px]"
        >
          {meta.label}
        </Badge>
      </TableCell>
      <TableCell className="font-mono text-xs text-text-3">{t.reference}</TableCell>
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
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Row actions"
          className="text-text-3"
        >
          <MoreHorizontal />
        </Button>
      </TableCell>
    </TableRow>
  )
}

function ActivitySkeletonRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
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
            <Skeleton className="h-6 w-16" />
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
