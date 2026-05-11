import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { CashFlowMini } from "@/components/dashboard/copilot/cash-flow-mini"
import { ChatComposer } from "@/components/dashboard/copilot/chat-composer"
import { ChatMessage } from "@/components/dashboard/copilot/chat-message"
import { CopilotContextRail } from "@/components/dashboard/copilot/copilot-context-rail"

const SUGGESTIONS = [
  "Take ₦1.2M instead of ₦1.8M to keep score above 80",
  "Schedule repayments on Mondays — your softest day for income",
  "Auto-set ₦12k weekly to a buffer wallet",
] as const

export default function CopilotPage() {
  return (
    <DashboardPage
      title="Financial Copilot"
      meta="Grounded in your transactions. Ask anything about your money."
    >
      <div className="-mx-4 -my-5 grid sm:-mx-6 sm:-my-6 lg:-mx-8 lg:-my-8 lg:grid-cols-[1fr_minmax(280px,360px)]">
        <div className="flex min-h-[calc(100svh-9rem)] flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-12 lg:pb-8 lg:pt-4">
          <div className="flex-1 space-y-6 pb-6">
            <ChatMessage role="user">
              Can I afford a ₦1.2M loan right now?
            </ChatMessage>

            <ChatMessage role="assistant">
              <p>
                Yes — comfortably. At Gold tier (14.5% APR, 6 months) your
                weekly repayment of{" "}
                <span className="font-semibold text-foreground">₦52,840</span>{" "}
                sits inside your average free cash-flow with a{" "}
                <span className="font-semibold text-lime-600 dark:text-lime-400">
                  24% buffer
                </span>
                .
              </p>

              <CashFlowMini />

              <div>
                <p className="text-foreground">I&rsquo;d suggest:</p>
                <ul className="mt-2 space-y-1.5">
                  {SUGGESTIONS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-lime-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ChatMessage>

            <ChatMessage role="user">
              What if I go for ₦1.5M instead?
            </ChatMessage>

            <ChatMessage role="assistant">
              <p>
                Still safe — but tighter. Buffer drops to{" "}
                <span className="font-semibold text-warn-600 dark:text-warn-400">
                  9%
                </span>
                . In Q3 (your lean quarter) two weeks would dip below repayment.
                I can structure it as a{" "}
                <span className="font-semibold text-foreground">step-up plan</span>
                : 4 light weeks now, 16 normal weeks after.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button size="lg" className="h-9 rounded-full px-4 shadow-primary">
                  Use step-up plan
                </Button>
                <Button variant="outline" size="lg" className="h-9 rounded-full px-4">
                  Compare both side-by-side
                </Button>
              </div>
            </ChatMessage>
          </div>

          <ChatComposer />
        </div>

        <CopilotContextRail />
      </div>
    </DashboardPage>
  )
}
