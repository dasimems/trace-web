"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NubanCard } from "@/components/auth/nuban-card"
import { PillPicker, type PillOption } from "@/components/auth/pill-picker"
import { getNextStep } from "@/components/auth/sign-up-steps"

type AccountTypeId = "personal" | "business" | "savings"

const ACCOUNT_TYPES: ReadonlyArray<PillOption<AccountTypeId>> = [
  { id: "personal", label: "Personal · Day-to-day"      },
  { id: "business", label: "Business · Trader / shop"   },
  { id: "savings",  label: "Savings · Lock for goals"   },
]

const NUBAN_PILLS: readonly string[] = [
  "Reusable across all CBN banks",
  "Receives salary & POS settlements",
  "Free virtual card on activation",
] as const

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
      {children}
    </label>
  )
}

export function SignUpBankForm() {
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountTypeId | null>(
    "personal",
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = getNextStep("bank")
    if (next) router.push(next.path)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <section className="space-y-5">
        <h2 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
          YOUR ACCOUNT DETAILS
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="account-name">Account name</FieldLabel>
            <Input
              id="account-name"
              name="account_name"
              autoComplete="name"
              defaultValue="Adaeze Okafor"
              className="h-11 bg-card text-base"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="currency">Currency</FieldLabel>
            <div className="flex h-11 items-center justify-between rounded-lg border border-input bg-card pl-3 pr-2 text-base">
              <span className="text-foreground">Naira (NGN)</span>
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-text-3">
                USD coming soon
              </span>
              <input type="hidden" name="currency" value="NGN" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <FieldLabel htmlFor="account-type">Account type</FieldLabel>
          <PillPicker
            options={ACCOUNT_TYPES}
            value={accountType}
            onChange={setAccountType}
            ariaLabel="Pick the kind of account you want to open"
            name="account_type"
          />
          <p className="text-sm text-text-3">
            You can open up to 3 sub-accounts inside the same wallet later.
          </p>
        </div>
      </section>

      <NubanCard
        accountNumber="8024567192"
        accountName="ADAEZE OKAFOR"
        bank="Squad / GTCO · 058"
        status="active"
      />

      <ul className="flex flex-wrap gap-2">
        {NUBAN_PILLS.map((label) => (
          <li
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-text-2"
          >
            <Check className="size-3.5 text-lime-500" />
            {label}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          type="submit"
          size="lg"
          className="h-11 rounded-full px-5 shadow-primary"
        >
          Open this account <ArrowRight />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11 rounded-full px-5"
        >
          Save &amp; continue later
        </Button>
      </div>
    </motion.form>
  )
}
