export type SignUpStepId =
  | "account"
  | "bank"
  | "identity"
  | "analysis"
  | "profile"

export type SignUpStep = {
  id: SignUpStepId
  label: string
  path: string
}

export const SIGN_UP_STEPS: readonly SignUpStep[] = [
  { id: "account",  label: "Create your account",   path: "/auth/sign-up/account"  },
  { id: "bank",     label: "Open your Trace bank",  path: "/auth/sign-up/bank"     },
  { id: "identity", label: "Identity & KYC",        path: "/auth/sign-up/identity" },
  { id: "analysis", label: "AI is analyzing…",      path: "/auth/sign-up/analysis" },
  { id: "profile",  label: "Your financial profile", path: "/auth/sign-up/profile" },
] as const

export function getStepIndex(id: SignUpStepId): number {
  return SIGN_UP_STEPS.findIndex((s) => s.id === id)
}

export function getNextStep(id: SignUpStepId): SignUpStep | null {
  const i = getStepIndex(id)
  return i >= 0 && i < SIGN_UP_STEPS.length - 1 ? SIGN_UP_STEPS[i + 1] : null
}
