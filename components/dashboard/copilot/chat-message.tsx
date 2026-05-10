"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

type ChatMessageProps = {
  role: "user" | "assistant"
  children: ReactNode
}

export function ChatMessage({ role, children }: ChatMessageProps) {
  if (role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex justify-end"
      >
        <div className="max-w-[78%] rounded-2xl bg-neutral-950 px-4 py-2.5 text-sm text-white">
          {children}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex gap-3"
    >
      <span
        className={cn(
          "mt-1 flex size-7 shrink-0 items-center justify-center rounded-full",
          "bg-lime-100 text-lime-600 dark:bg-lime-500/20 dark:text-lime-400",
        )}
      >
        <Sparkles className="size-3.5" />
      </span>
      <div className="min-w-0 max-w-[80%] space-y-3 text-sm leading-relaxed text-text-2">
        {children}
      </div>
    </motion.div>
  )
}
