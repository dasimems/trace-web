import { ChevronRight, FileText } from "lucide-react"

type Document = {
  title: string
  caption: string
  href: string
}

const DOCUMENTS: ReadonlyArray<Document> = [
  {
    title: "Loan agreement",
    caption: "6 pages · digital sign",
    href: "/app/loans/agreement",
  },
  {
    title: "Direct-debit mandate",
    caption: "Trace wallet · daily",
    href: "/app/loans/mandate",
  },
  {
    title: "Privacy & data use",
    caption: "NDPR-compliant",
    href: "/legal/privacy",
  },
]

type Question = {
  question: string
  answer: string
}

const QUESTIONS: ReadonlyArray<Question> = [
  {
    question: "What happens if I miss a daily debit?",
    answer:
      "Copilot retries the next morning, then snoozes for 3 days before any fee is applied.",
  },
  {
    question: "Can I repay early?",
    answer: "Yes — no early-repayment fee. Save the unaccrued interest.",
  },
  {
    question: "Does it affect my credit elsewhere?",
    answer: "On-time repayment lifts your CRC and Trace tier together.",
  },
]

export function DocumentsCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Documents you&rsquo;ll sign
      </h3>
      <ul className="mt-3 divide-y divide-border">
        {DOCUMENTS.map((doc) => (
          <li key={doc.title}>
            <a
              href={doc.href}
              className="group flex items-center gap-3 py-3 transition-colors hover:text-foreground"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-text-2">
                <FileText className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground">
                  {doc.title}
                </div>
                <div className="text-xs text-text-3">{doc.caption}</div>
              </div>
              <ChevronRight className="size-4 text-text-3 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CommonQuestionsCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Common questions
      </h3>
      <ul className="mt-3 divide-y divide-border">
        {QUESTIONS.map((qa) => (
          <li key={qa.question} className="py-3">
            <div className="text-sm font-semibold text-foreground">
              {qa.question}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-text-2">{qa.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
