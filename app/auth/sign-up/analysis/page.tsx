import { AuthShell } from "@/components/auth/auth-shell"
import {
  AnalysisChecklist,
  type AnalysisStep,
} from "@/components/auth/analysis-checklist"
import {
  DetectedSoFarCard,
  LivePreviewCard,
} from "@/components/auth/analysis-rail"
import { ProgressStrip } from "@/components/auth/progress-strip"
import { SignUpStepper } from "@/components/auth/sign-up-stepper"
import { SIGN_UP_STEPS, getStepIndex } from "@/components/auth/sign-up-steps"

const ANALYSIS_STEPS: ReadonlyArray<AnalysisStep> = [
  {
    title: "Pulling 6 months of GTBank transactions",
    detail: "4,217 records",
    status: "done",
  },
  {
    title: "Auto-categorizing merchants & expenses",
    detail: "38 categories",
    status: "done",
  },
  {
    title: "Detecting recurring income & subscriptions",
    detail: "7 recurring patterns",
    status: "done",
  },
  {
    title: "Building cash-flow & savings model",
    detail: "modeling 12 weeks ahead…",
    status: "active",
  },
  {
    title: "Calibrating financial health score",
    detail: "",
    status: "todo",
  },
  {
    title: "Matching opportunities to your profile",
    detail: "",
    status: "todo",
  },
]

export default function SignUpAnalysisPage() {
  const current = getStepIndex("analysis") + 1
  return (
    <AuthShell aside={<SignUpStepper current="analysis" />}>
      <div className="space-y-10 pt-2">
        <ProgressStrip current={current} total={SIGN_UP_STEPS.length} />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl">
            Hold tight — Copilot is reading your life in numbers.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-2">
            This usually takes 30 to 90 seconds. Stay on this page; we&apos;ll
            move you forward as soon as your profile is ready.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,360px)]">
          <div className="space-y-5">
            <AnalysisChecklist steps={ANALYSIS_STEPS} />
            <p className="text-sm leading-relaxed text-text-2">
              <span className="font-semibold text-foreground">
                What&apos;s happening:
              </span>{" "}
              Our model is studying 4,217 transactions, clustering them into
              spend categories, and learning the rhythm of your income. Nothing
              leaves your account.
            </p>
          </div>
          <aside className="space-y-4">
            <LivePreviewCard />
            <DetectedSoFarCard
              count={4217}
              caption="transactions across 2 accounts · Jan 2025 — today"
            />
          </aside>
        </div>
      </div>
    </AuthShell>
  )
}
