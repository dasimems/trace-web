import { ArrowRight } from "lucide-react"

import { AiInsightCard } from "@/components/auth/ai-insight-card"
import { AuthShell } from "@/components/auth/auth-shell"
import { CopilotFeatures } from "@/components/auth/copilot-features"
import { HealthScoreCard } from "@/components/auth/health-score-card"
import { ProgressStrip } from "@/components/auth/progress-strip"
import { SignUpStepper } from "@/components/auth/sign-up-stepper"
import { SIGN_UP_STEPS, getStepIndex } from "@/components/auth/sign-up-steps"
import { Button } from "@/components/ui/button"

export default function SignUpProfilePage() {
  const current = getStepIndex("profile") + 1
  return (
    <AuthShell aside={<SignUpStepper current="profile" />}>
      <div className="space-y-10 pt-2">
        <ProgressStrip current={current} total={SIGN_UP_STEPS.length} />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Meet your financial profile.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-2">
            Built from your last 6 months. Save it, share with Copilot, or
            jump straight into your dashboard.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,360px)]">
          <div className="space-y-8">
            <HealthScoreCard />
            <CopilotFeatures />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full px-5 shadow-primary"
              >
                <a href="/app/overview">
                  Open my dashboard <ArrowRight />
                </a>
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
            <AiInsightCard
              title="You qualify for Gold-tier loans up to ₦1.8M"
              body="Stable income for 9 weeks · debt-to-income 0.18"
              ctaLabel="See offers"
              ctaHref="/dashboard/loans"
            />
            <AiInsightCard
              title="3 low-risk investment matches"
              body="₦15k–₦150k MMFs and a SquadCapital coop fund align with your risk appetite."
              ctaLabel="Browse"
              ctaHref="/dashboard/invest"
            />
          </aside>
        </div>
      </div>
    </AuthShell>
  )
}
