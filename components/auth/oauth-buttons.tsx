"use client"

import { Button } from "@/components/ui/button"

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
    <div className={`grid grid-cols-1 gap-3 ${className ?? ""}`}>
      <Button variant="outline" size="lg" className="h-11 gap-2 text-sm">
        <AppleIcon /> Continue with Apple
      </Button>
    </div>
  )
}
