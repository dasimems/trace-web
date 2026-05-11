"use client"

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type CategoryTone = "warn" | "lime" | "info" | "purple" | "bad" | "muted"

type CaptionTone = "recurring" | "income" | "ai" | "anomaly"

type Activity = {
  initials: string
  merchant: string
  caption: { kind: CaptionTone; text: string }
  category: { label: string; tone: CategoryTone }
  channel: string
  date: string
  amount: number
  needsReview?: boolean
}

const ACTIVITIES: ReadonlyArray<Activity> = [
  {
    initials: "CD",
    merchant: "Chowdeck",
    caption: { kind: "recurring", text: "Recurring · monthly" },
    category: { label: "Food & dining", tone: "warn" },
    channel: "GTBank",
    date: "Today · 8:14pm",
    amount: -4_200,
  },
  {
    initials: "BF",
    merchant: "Salary · Balogun Fabrics",
    caption: { kind: "income", text: "Income · weekly" },
    category: { label: "Income", tone: "lime" },
    channel: "Squad",
    date: "Today · 9:01am",
    amount: 340_000,
  },
  {
    initials: "BT",
    merchant: "Bolt rides",
    caption: { kind: "ai", text: "AI-tagged · 99% confident" },
    category: { label: "Transport", tone: "info" },
    channel: "11:42pm",
    date: "Yesterday · 11:42pm",
    amount: -3_150,
  },
  {
    initials: "MB",
    merchant: "Mr. Biggs · Surulere",
    caption: { kind: "anomaly", text: "Unusual time vs baseline" },
    category: { label: "Food & dining", tone: "warn" },
    channel: "7:20pm",
    date: "Yesterday · 7:20pm",
    amount: -5_800,
    needsReview: true,
  },
  {
    initials: "IK",
    merchant: "IKEDC bill",
    caption: { kind: "recurring", text: "Recurring · monthly" },
    category: { label: "Bills", tone: "purple" },
    channel: "2:11pm",
    date: "8 May · 2:11pm",
    amount: -18_400,
  },
  {
    initials: "JM",
    merchant: "Jumia order",
    caption: { kind: "ai", text: "AI-tagged · 99% confident" },
    category: { label: "Shopping", tone: "bad" },
    channel: "10:00am",
    date: "7 May · 10:00am",
    amount: -24_990,
  },
  {
    initials: "AD",
    merchant: "Transfer · Adaobi",
    caption: { kind: "ai", text: "AI-tagged · 99% confident" },
    category: { label: "Transfer", tone: "muted" },
    channel: "8:55am",
    date: "7 May · 8:55am",
    amount: -15_000,
  },
  {
    initials: "SP",
    merchant: "Spotify",
    caption: { kind: "recurring", text: "Recurring · monthly" },
    category: { label: "Bills", tone: "purple" },
    channel: "12:00am",
    date: "6 May · 12:00am",
    amount: -1_300,
  },
  {
    initials: "PS",
    merchant: "Transaction · POS Apapa",
    caption: { kind: "ai", text: "AI-tagged · 99% confident" },
    category: { label: "Income", tone: "lime" },
    channel: "Squad",
    date: "6 May · 4:32pm",
    amount: 68_500,
  },
  {
    initials: "UB",
    merchant: "Uber Eats",
    caption: { kind: "ai", text: "AI-tagged · 99% confident" },
    category: { label: "Food & dining", tone: "warn" },
    channel: "9:11pm",
    date: "5 May · 9:11pm",
    amount: -5_400,
  },
]

const CAPTION_ICON: Record<CaptionTone, LucideIcon | null> = {
  recurring: RefreshCw,
  income: ArrowUpRight,
  ai: null,
  anomaly: AlertTriangle,
}

const CAPTION_COLOR: Record<CaptionTone, string> = {
  recurring: "text-text-3",
  income:    "text-lime-600 dark:text-lime-400",
  ai:        "text-text-3",
  anomaly:   "text-warn-600 dark:text-warn-400",
}

const CATEGORY_BG: Record<CategoryTone, string> = {
  warn:   "bg-warn-50 text-warn-700 border-warn-200 dark:bg-warn-500/15 dark:text-warn-300 dark:border-warn-500/30",
  lime:   "bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-500/15 dark:text-lime-300 dark:border-lime-500/30",
  info:   "bg-info-50 text-info-700 border-info-200 dark:bg-info-500/15 dark:text-info-300 dark:border-info-500/30",
  purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30",
  bad:    "bg-bad-50 text-bad-700 border-bad-200 dark:bg-bad-500/15 dark:text-bad-300 dark:border-bad-500/30",
  muted:  "bg-card text-text-2 border-border",
}

function formatAmount(amount: number): string {
  const sign = amount >= 0 ? "+" : "-"
  const abs = Math.abs(amount).toLocaleString()
  return `${sign}₦${abs}`
}

export function RecentActivityTable() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Recent activity
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          Last 7 days
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
            {ACTIVITIES.map((activity) => (
              <ActivityRow key={activity.merchant + activity.date} activity={activity} />
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  )
}

function ActivityRow({ activity }: { activity: Activity }) {
  const CaptionIcon = CAPTION_ICON[activity.caption.kind]
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-text-2">
            {activity.initials}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {activity.merchant}
            </div>
            <div
              className={cn(
                "mt-0.5 flex items-center gap-1 truncate text-xs",
                CAPTION_COLOR[activity.caption.kind],
              )}
            >
              {CaptionIcon && <CaptionIcon className="size-3" />}
              {activity.caption.text}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span
          className={cn(
            "inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium",
            CATEGORY_BG[activity.category.tone],
          )}
        >
          {activity.category.label}
        </span>
      </TableCell>
      <TableCell className="text-sm text-text-2">{activity.channel}</TableCell>
      <TableCell className="text-sm text-text-2">{activity.date}</TableCell>
      <TableCell
        className={cn(
          "text-right font-display text-sm font-semibold tabular-nums",
          activity.amount > 0
            ? "text-lime-600 dark:text-lime-400"
            : "text-foreground",
        )}
      >
        {formatAmount(activity.amount)}
      </TableCell>
      <TableCell>
        {activity.needsReview ? (
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
