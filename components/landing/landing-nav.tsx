"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

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
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative z-20"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" aria-label="Trace home" className="shrink-0">
          <LogoWordmark />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
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

        <div className="flex items-center gap-4">
          <a
            href="/auth/sign-in"
            className="hidden text-sm font-medium text-text-2 transition-colors hover:text-foreground sm:inline"
          >
            Sign in
          </a>
          <Button
            asChild
            size="lg"
            className="rounded-full px-4 shadow-primary"
          >
            <a href="/app/overview">
              Open my dashboard <ArrowRight />
            </a>
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
