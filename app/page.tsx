import type { Metadata } from "next"

import { LandingNav } from "@/components/landing/landing-nav"
import { Hero } from "@/components/landing/hero"
import { PartnersRow } from "@/components/landing/partners-row"
import { FeatureCards } from "@/components/landing/feature-cards"

export const metadata: Metadata = {
  title: { absolute: "Trace · Self-driving money for creators and SMBs" },
}

export default function Page() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <LandingNav />
      <Hero />
      <PartnersRow />
      <FeatureCards />
    </main>
  )
}
