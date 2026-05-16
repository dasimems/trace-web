"use client"

import { AuthShell } from "@/components/auth/auth-shell"
import { ProgressStrip } from "@/components/auth/progress-strip"
import { SignUpAccountForm } from "@/components/auth/sign-up-account-form"
import { SignUpStepper } from "@/components/auth/sign-up-stepper"
import { withRedirectIfAuthed } from "@/components/auth/with-redirect-if-authed"
import { SIGN_UP_STEPS, getStepIndex } from "@/components/auth/sign-up-steps"

function SignUpAccountPage() {
  const current = getStepIndex("account") + 1
  return (
    <AuthShell aside={<SignUpStepper current="account" />}>
      <div className="space-y-10 pt-2">
        <ProgressStrip current={current} total={SIGN_UP_STEPS.length} />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Create your account.
          </h1>
          <p className="max-w-xl text-base text-text-2">
            One profile, every angle of your money. Use your phone or email —
            whichever you trust more.
          </p>
        </header>

        <SignUpAccountForm />
      </div>
    </AuthShell>
  )
}

export default withRedirectIfAuthed(SignUpAccountPage)
