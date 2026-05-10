"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OAuthButtons } from "@/components/auth/oauth-buttons"
import { RolePicker, type RoleId } from "@/components/auth/role-picker"
import { getNextStep } from "@/components/auth/sign-up-steps"

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-foreground"
    >
      {children}
    </label>
  )
}

export function SignUpAccountForm() {
  const router = useRouter()
  const [role, setRole] = useState<RoleId | null>("trader")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = getNextStep("account")
    if (next) router.push(next.path)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-7"
    >
      <OAuthButtons />

      <div className="flex items-center gap-3 text-xs text-text-3">
        <span className="h-px flex-1 bg-border" />
        <span>or with email</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="full-name">Full name</FieldLabel>
        <Input
          id="full-name"
          name="full_name"
          autoComplete="name"
          defaultValue="Adaeze Okafor"
          className="h-11 bg-card text-base"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.ng"
            className="h-11 bg-card text-base"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 803 ··· 41"
            className="h-11 bg-card text-base"
          />
        </div>
      </div>

      <div className="space-y-3">
        <FieldLabel htmlFor="role">I am a…</FieldLabel>
        <RolePicker value={role} onChange={setRole} name="role" />
        <p className="text-sm text-text-3">
          Helps Copilot tune insights to how you actually earn and spend.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Button
          type="submit"
          size="lg"
          className="h-11 rounded-full px-5 shadow-primary"
        >
          Continue <ArrowRight />
        </Button>
        <p className="text-sm text-text-3">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Terms
          </a>{" "}
          ·{" "}
          <a
            href="/privacy"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Privacy
          </a>
        </p>
      </div>
    </motion.form>
  )
}
