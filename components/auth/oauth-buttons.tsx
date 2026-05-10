"use client"

import { Button } from "@/components/ui/button"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden className="size-4">
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.56 2.69-3.87 2.69-6.62z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.36 0-4.36-1.59-5.07-3.73H.93v2.34A9 9 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.93 10.69A5.42 5.42 0 0 1 3.64 9c0-.59.1-1.16.29-1.69V4.97H.93A8.99 8.99 0 0 0 0 9c0 1.45.35 2.82.93 4.03l3-2.34z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.51.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .93 4.97l3 2.34C4.64 5.17 6.64 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 16 18" aria-hidden className="size-4 fill-current">
      <path d="M11.624 9.554c-.02-2.062 1.683-3.05 1.76-3.099-.96-1.404-2.452-1.595-2.984-1.617-1.27-.128-2.48.748-3.124.748-.643 0-1.643-.728-2.7-.708-1.39.02-2.668.808-3.385 2.05-1.443 2.498-.37 6.196 1.04 8.224.692.99 1.515 2.103 2.598 2.063 1.044-.04 1.439-.674 2.7-.674 1.262 0 1.616.674 2.72.652 1.123-.02 1.836-1.013 2.523-2.005.794-1.149 1.123-2.262 1.143-2.32-.025-.012-2.193-.842-2.215-3.341l-.076.027zM9.585 3.59c.578-.7.967-1.673.86-2.643-.832.034-1.838.554-2.434 1.253-.535.62-1.005 1.61-.876 2.563.926.071 1.873-.471 2.45-1.173z" />
    </svg>
  )
}

type OAuthButtonsProps = {
  className?: string
}

export function OAuthButtons({ className }: OAuthButtonsProps) {
  return (
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${className ?? ""}`}>
      <Button variant="outline" size="lg" className="h-11 gap-2 text-sm">
        <GoogleIcon /> Continue with Google
      </Button>
      <Button variant="outline" size="lg" className="h-11 gap-2 text-sm">
        <AppleIcon /> Continue with Apple
      </Button>
    </div>
  )
}
