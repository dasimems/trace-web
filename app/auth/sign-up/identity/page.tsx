import type { Metadata } from "next"

import { AuthShell } from "@/components/auth/auth-shell"
import { ProgressStrip } from "@/components/auth/progress-strip"
import { SignUpIdentityForm } from "@/components/auth/sign-up-identity-form"
import { SignUpStepper } from "@/components/auth/sign-up-stepper"
import { SIGN_UP_STEPS, getStepIndex } from "@/components/auth/sign-up-steps"
import { TierPreview } from "@/components/auth/tier-preview"

export const metadata: Metadata = { title: "Identity" }

export default function SignUpIdentityPage() {
  const current = getStepIndex("identity") + 1
  return (
    <AuthShell aside={<SignUpStepper current="identity" />}>
      <div className="space-y-10 pt-2">
        <ProgressStrip current={current} total={SIGN_UP_STEPS.length} />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Verify your identity.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-2">
            Required to unlock loans, larger investments and to comply with CBN
            regulations. Takes about 2 minutes.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,360px)]">
          <SignUpIdentityForm />
          <aside className="space-y-4">
            <TierPreview />
          </aside>
        </div>
      </div>
    </AuthShell>
  )
}
