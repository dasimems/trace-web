"use client"

import { useCallback, useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { ChatComposer } from "@/components/dashboard/copilot/chat-composer"
import { ChatMessage } from "@/components/dashboard/copilot/chat-message"
import { CopilotContextRail } from "@/components/dashboard/copilot/copilot-context-rail"
import useCopilotStore from "@/stores/copilot-store"

export default function CopilotPage() {
  const messages = useCopilotStore((s) => s.messages)
  const isLoading = useCopilotStore((s) => s.isLoading)
  const isSending = useCopilotStore((s) => s.isSending)
  const error = useCopilotStore((s) => s.error)
  const hasFetched = useCopilotStore((s) => s.hasFetched)
  const fetchMessages = useCopilotStore((s) => s.fetchMessages)
  const sendMessage = useCopilotStore((s) => s.sendMessage)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasFetched) fetchMessages()
  }, [hasFetched, fetchMessages])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages.length, isSending])

  const handleSubmit = useCallback(
    async (content: string) => {
      await sendMessage(content)
    },
    [sendMessage],
  )

  return (
    <DashboardPage
      title="Financial Copilot"
      meta="Trained on your Squad transaction history. Ask anything about your money, your score, or your next move.
"
    >
      <div className="-mx-4 -my-5 grid sm:-mx-6 sm:-my-6 lg:-mx-8 lg:-my-8 lg:grid-cols-[1fr_minmax(280px,360px)]">
        <div className="flex min-h-[calc(100svh-9rem)] flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-12 lg:pb-8 lg:pt-4">
          <div className="flex-1 space-y-6 pb-6">
            {isLoading && messages.length === 0 ? (
              <ChatSkeleton />
            ) : messages.length === 0 ? (
              <EmptyState />
            ) : (
              messages.map((m) => (
                <ChatMessage
                  key={m.id}
                  role={m.role === "USER" ? "user" : "assistant"}
                >
                  {m.content}
                </ChatMessage>
              ))
            )}
            {isSending && (
              <ChatMessage role="assistant">
                <span className="inline-flex items-center gap-2 text-text-3">
                  <Sparkles className="size-3.5 animate-pulse text-lime-500" />
                  Thinking…
                </span>
              </ChatMessage>
            )}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div ref={endRef} />
          </div>

          <ChatComposer onSubmit={handleSubmit} isSending={isSending} />
        </div>

        <CopilotContextRail />
      </div>
    </DashboardPage>
  )
}

function EmptyState() {
  return (
    <ChatMessage role="assistant">
      <p>
        Hi 👋 — I&rsquo;m Copilot, your financial second brain. Ask anything
        about your money, your spending, or upcoming decisions.
      </p>
      <p className="text-text-3">
        Try: <em>&ldquo;Can I afford a ₦1.2M loan right now?&rdquo;</em> ·{" "}
        <em>&ldquo;Where did my food spend go last week?&rdquo;</em>
      </p>
    </ChatMessage>
  )
}

function ChatSkeleton() {
  return (
    <>
      <div className="flex justify-end">
        <Skeleton className="h-9 w-64 rounded-2xl" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="size-7 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </>
  )
}
