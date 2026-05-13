import { AuthShell } from "@/components/auth/auth-shell"
import { ProgressStrip } from "@/components/auth/progress-strip"
import { SignUpAccountForm } from "@/components/auth/sign-up-account-form"
import { SignUpStepper } from "@/components/auth/sign-up-stepper"
import { SIGN_UP_STEPS, getStepIndex } from "@/components/auth/sign-up-steps"

export default function SignUpAccountPage() {
  const current = getStepIndex("account") + 1
  return (
    <AuthShell aside={<SignUpStepper current="account" />}>
      <div className="space-y-10 pt-2">
        <ProgressStrip current={current} total={SIGN_UP_STEPS.length} />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Start your Trace.
          </h1>
          <p className="max-w-xl text-base text-text-2">
            Your business has always been real. Now it's visible.
          </p>
        </header>

        <SignUpAccountForm />
      </div>
    </AuthShell>
  )
}
