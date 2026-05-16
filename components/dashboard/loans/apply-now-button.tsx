"use client"

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export const REPAYMENT_SIMULATOR_ANCHOR_ID = "repayment-simulator"

export function ApplyNowButton() {
  const handleClick = () => {
    if (typeof document === "undefined") return
    const target = document.getElementById(REPAYMENT_SIMULATOR_ANCHOR_ID)
    if (!target) return
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <Button
      size="lg"
      onClick={handleClick}
      className="h-9 gap-2 rounded-full px-4 shadow-primary"
    >
      Apply now <ArrowRight />
    </Button>
  )
}
