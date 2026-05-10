import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OAuthButtons } from "@/components/auth/oauth-buttons"

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

        <form className="space-y-5" action="#">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email or phone
            </label>
            <Input
              id="email"
              name="identifier"
              autoComplete="username"
              className="h-11 bg-card text-base"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <a
                href="/auth/reset"
                className="text-xs text-text-3 underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-11 bg-card text-base"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-11 w-full rounded-full px-5 shadow-primary"
          >
            Sign in <ArrowRight />
          </Button>
        </form>

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
