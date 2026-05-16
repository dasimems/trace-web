"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { AuthShell } from "@/components/auth/auth-shell"
import { CopilotFeatures } from "@/components/auth/copilot-features"
import { HealthScoreCard } from "@/components/auth/health-score-card"
import { NubanCard } from "@/components/auth/nuban-card"
import { ProfileInsights } from "@/components/auth/profile-insights"
import { ProgressStrip } from "@/components/auth/progress-strip"
import { SignUpStepper } from "@/components/auth/sign-up-stepper"
import { SIGN_UP_STEPS, getStepIndex } from "@/components/auth/sign-up-steps"
import { Button } from "@/components/ui/button"
import useUserStore from "@/stores/user-store"

export default function SignUpProfilePage() {
  const router = useRouter()
  const current = getStepIndex("profile") + 1
  const userDetails = useUserStore((s) => s.userDetails)
  const firstName = userDetails?.firstName
  const primaryAccount = userDetails?.bankAccounts?.[0]

  return (
    <AuthShell aside={<SignUpStepper current="profile" />}>
      <div className="space-y-10 pt-2">
        <ProgressStrip current={current} total={SIGN_UP_STEPS.length} />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            {firstName
              ? `Welcome to Trace, ${firstName}.`
              : "Meet your financial profile."}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-2">
            Built from your last 6 months. Save it, share with Copilot, or
            jump straight into your dashboard.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,360px)]">
          <div className="space-y-8">
            {primaryAccount && (
              <NubanCard
                accountNumber={primaryAccount.accountNumber}
                accountName={primaryAccount.accountName}
                bank={`Squad / GTCO · ${primaryAccount.bankCode}`}
                status="active"
              />
            )}

            <HealthScoreCard />
            <CopilotFeatures />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                type="button"
                onClick={() => router.push("/app/overview")}
                size="lg"
                className="h-11 rounded-full px-5 shadow-primary"
              >
                Open my dashboard <ArrowRight />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 rounded-full px-5"
              >
                Tour the features
              </Button>
            </div>
          </div>

          <aside className="space-y-4">
            <ProfileInsights />
          </aside>
        </div>
      </div>
    </AuthShell>
  )
}
