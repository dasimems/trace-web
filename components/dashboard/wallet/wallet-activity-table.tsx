"use client"

import { ChevronDown, Download, MoreHorizontal } from "lucide-react"

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

type TypeTone = "lime" | "info" | "purple" | "warn" | "muted"

type Activity = {
  initials: string
  description: string
  caption: string
  type: { label: string; tone: TypeTone }
  reference: string
  date: string
  amount: number
}

const ACTIVITIES: ReadonlyArray<Activity> = [
  {
    initials: "BF",
    description: "Salary · Balogun Fabrics",
    caption: "NIP transfer · GTBank",
    type: { label: "Income", tone: "lime" },
    reference: "TR-889423",
    date: "Today · 9:01am",
    amount: 340_000,
  },
  {
    initials: "GT",
    description: "Funded from GTBank ****4112",
    caption: "NIP inbound · TraceID #58241",
    type: { label: "Top-up", tone: "info" },
    reference: "TR-889424",
    date: "Today · 8:14am",
    amount: 80_000,
  },
  {
    initials: "AD",
    description: "Transfer · Adaobi Ifeanyi",
    caption: "Opay · 8138 ··· 21",
    type: { label: "Transfer", tone: "muted" },
    reference: "TR-889425",
    date: "Yesterday · 4:32pm",
    amount: -15_000,
  },
  {
    initials: "C",
    description: "Move to Save",
    caption: "Spend → Save · auto-rule",
    type: { label: "Internal", tone: "purple" },
    reference: "TR-889426",
    date: "Yesterday · 9:00am",
    amount: -25_000,
  },
  {
    initials: "PS",
    description: "POS settlement · Apapa",
    caption: "Squad merchant · 12 txns",
    type: { label: "Income", tone: "lime" },
    reference: "TR-889427",
    date: "8 May · 6:30pm",
    amount: 68_500,
  },
  {
    initials: "IK",
    description: "IKEDC bill",
    caption: "Recurring · monthly",
    type: { label: "Bills", tone: "warn" },
    reference: "TR-889428",
    date: "8 May · 2:11pm",
    amount: -18_400,
  },
  {
    initials: "SP",
    description: "Virtual card · Spotify",
    caption: "Card · *7821",
    type: { label: "Bills", tone: "warn" },
    reference: "TR-889429",
    date: "6 May · 12:00am",
    amount: -1_300,
  },
  {
    initials: "MS",
    description: "Move to Goals · Store",
    caption: "Spend → Goals · Lagos store",
    type: { label: "Internal", tone: "purple" },
    reference: "TR-889430",
    date: "5 May · 10:00am",
    amount: -10_000,
  },
]

function formatAmount(amount: number): string {
  const sign = amount >= 0 ? "+" : "-"
  const abs = Math.abs(amount).toLocaleString()
  return `${sign}₦${abs}`
}

export function WalletActivityTable() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Wallet activity
        </h3>
        <Badge variant="secondary" className="h-6 px-2.5 text-[11px]">
          This week
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full px-3 text-xs">
            All types <ChevronDown />
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full px-3 text-xs">
            <Download /> Statement
          </Button>
        </div>
      </div>

      <div className="mt-4">
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
            {ACTIVITIES.map((activity) => (
              <ActivityRow key={activity.reference} activity={activity} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-text-2">
            {activity.initials}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {activity.description}
            </div>
            <div className="truncate text-xs text-text-3">
              {activity.caption}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={activity.type.tone === "muted" ? "outline" : activity.type.tone} className="h-6 px-2.5 text-[11px]">
          {activity.type.label}
        </Badge>
      </TableCell>
      <TableCell className="font-mono text-xs text-text-3">
        {activity.reference}
      </TableCell>
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
