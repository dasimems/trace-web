import type { Metadata } from "next"

import { AuthShell } from "@/components/auth/auth-shell"
import {
  AlreadyBankElsewhere,
  IncludedFromStart,
  WhyTraceBank,
} from "@/components/auth/bank-rail"
import { ProgressStrip } from "@/components/auth/progress-strip"
import { SignUpBankForm } from "@/components/auth/sign-up-bank-form"
import { SignUpStepper } from "@/components/auth/sign-up-stepper"
import { SIGN_UP_STEPS, getStepIndex } from "@/components/auth/sign-up-steps"

export const metadata: Metadata = { title: "Connect bank" }

export default function SignUpBankPage() {
  const current = getStepIndex("bank") + 1
  return (
    <AuthShell aside={<SignUpStepper current="bank" />}>
      <div className="space-y-10 pt-2">
        <ProgressStrip current={current} total={SIGN_UP_STEPS.length} />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Open your Trace bank account.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-2">
            No external bank to link. We open a real NUBAN account for you in
            seconds — fully yours, powered by Squad by GTCO. Receive salary,
            fund your wallet, and start building your financial profile from
            day one.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,360px)]">
          <SignUpBankForm />
          <aside className="space-y-4">
            <WhyTraceBank />
            <IncludedFromStart />
            <AlreadyBankElsewhere />
          </aside>
        </div>
      </div>
    </AuthShell>
  )
}
