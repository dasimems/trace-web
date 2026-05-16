import type { Metadata } from "next"
import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { OAuthButtons } from "@/components/auth/oauth-buttons"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = { title: "Sign in" }

export default function SignInPage() {
  return (
    <AuthShell>
      <div className="max-w-md space-y-8 pt-2">
        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Welcome back.
          </h1>
          <p className="text-base text-text-2">
            Sign in to your Trace dashboard.
          </p>
        </header>

        <OAuthButtons />

        <div className="flex items-center gap-3 text-xs text-text-3">
          <span className="h-px flex-1 bg-border" />
          <span>or with email</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <SignInForm />

        <p className="text-sm text-text-3">
          New to Trace?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Open an account
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}
