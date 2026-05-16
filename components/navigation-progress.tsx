"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"

const TRICKLE_INTERVAL_MS = 200
const FADE_OUT_MS = 200

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearTimers() {
    if (trickleRef.current) {
      clearInterval(trickleRef.current)
      trickleRef.current = null
    }
    if (fadeRef.current) {
      clearTimeout(fadeRef.current)
      fadeRef.current = null
    }
  }

  function start() {
    clearTimers()
    setVisible(true)
    setProgress((p) => (p > 0 ? p : 8))
    trickleRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p
        const remaining = 92 - p
        const next = p + Math.max(1, Math.round(remaining * 0.18))
        return Math.min(next, 92)
      })
    }, TRICKLE_INTERVAL_MS)
  }

  function complete() {
    if (!visible) return
    clearTimers()
    setProgress(100)
    fadeRef.current = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, FADE_OUT_MS)
  }

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as HTMLElement | null)?.closest("a")
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href) return
      if (anchor.target && anchor.target !== "_self") return
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return
      }
      if (anchor.hasAttribute("download")) return
      if (anchor.getAttribute("rel")?.includes("external")) return
      // Same-path link with hash only — don't start the bar.
      const currentPath = window.location.pathname + window.location.search
      if (href === currentPath) return
      start()
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  useEffect(() => {
    complete()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  useEffect(() => clearTimers, [])

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] h-0.5 w-full transition-opacity",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className="h-full bg-lime-500 shadow-[0_0_8px_var(--color-lime-500)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
