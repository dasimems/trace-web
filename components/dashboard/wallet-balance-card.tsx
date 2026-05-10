"use client"

import { motion } from "motion/react"
import { ArrowUpRight, CreditCard, Plus, Receipt } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const ACTIONS = [
  { label: "Send",    icon: ArrowUpRight, primary: false },
  { label: "Request", icon: Receipt,      primary: false },
  { label: "Cards",   icon: CreditCard,   primary: false },
] as const

export function WalletBalanceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
      className="col-span-12 rounded-2xl border border-border bg-card p-6 shadow-card sm:col-span-6 xl:col-span-4"
    >
      <div className="flex items-start justify-between">
        <div className="text-sm text-text-3">Wallet balance</div>
        <Badge variant="good" className="h-6 px-2.5 text-xs">
          NDIC-insured
        </Badge>
      </div>

      <div className="mt-3 flex items-baseline">
        <span className="font-display text-4xl font-semibold tabular-nums tracking-tight text-foreground">
          ₦487,210
        </span>
        <span className="font-display text-xl font-semibold tabular-nums text-text-3">
          .40
        </span>
      </div>
      <div className="mt-1 text-sm text-text-3">
        Available to spend · Ledger ₦487,210.40
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="lg" className="h-9 gap-1.5 rounded-full px-3.5 shadow-primary">
          <Plus />
          Fund
        </Button>
        {ACTIONS.map(({ label, icon: Icon }) => (
          <Button
            key={label}
            variant="outline"
            size="lg"
            className="h-9 gap-1.5 rounded-full px-3.5"
          >
            <Icon />
            {label}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}
