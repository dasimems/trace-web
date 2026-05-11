"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LogoWordmark } from "@/components/landing/logo-mark"

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "For Providers", href: "#providers" },
  { label: "Pricing", href: "#pricing" },
] as const

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative z-20"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <a href="/" aria-label="Trace home" className="shrink-0">
          <LogoWordmark />
        </a>

        <ul className="hidden items-center gap-5 lg:flex lg:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-text-2 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="/auth/sign-in"
            className="hidden text-sm font-medium text-text-2 transition-colors hover:text-foreground sm:inline"
          >
            Sign in
          </a>
          <Button
            asChild
            size="lg"
            className="hidden rounded-full px-4 shadow-primary sm:inline-flex"
          >
            <a href="/app/overview">
              Open my dashboard <ArrowRight />
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="rounded-full px-3 shadow-primary sm:hidden"
          >
            <a href="/app/overview" aria-label="Open dashboard">
              Dashboard
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open ? "true" : "false"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-3 top-full mt-2 origin-top rounded-2xl border border-border bg-card p-4 shadow-card sm:inset-x-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-text-2 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-border pt-2 sm:hidden">
                <a
                  href="/auth/sign-in"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-text-2 transition-colors hover:bg-muted hover:text-foreground"
                >
                  Sign in
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
