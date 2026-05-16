"use client"

import { Check, ChevronRight, FileText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  getOpportunityDocuments,
  getOpportunityFaq,
  type TOpportunity,
} from "@/api/opportunities"

type Props = {
  opportunity: TOpportunity
}

const CATEGORY_LABEL: Record<string, string> = {
  IDENTITY: "Identity",
  BUSINESS: "Business",
  FINANCIAL: "Financial",
  COLLATERAL: "Collateral",
  OTHER: "Other",
}

export function DocumentsCard({ opportunity }: Props) {
  const { data, isLoading, error } = useEndpoint(
    `/opportunities/${opportunity.source}/${opportunity.id}/documents`,
    () => getOpportunityDocuments(opportunity.source, opportunity.id),
  )

  const documents = data?.documents ?? []

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Documents you&rsquo;ll need
      </h3>

      {documents.length === 0 ? (
        isLoading ? (
          <DocsSkeleton />
        ) : error ? (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-3 text-sm text-text-3">
            No paperwork required.
          </p>
        )
      ) : (
        <ul className="mt-3 divide-y divide-border">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center gap-3 py-3 text-sm"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-text-2">
                {doc.uploaded ? (
                  <Check className="size-4 text-lime-500" />
                ) : (
                  <FileText className="size-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {doc.label}
                  </span>
                  {doc.required ? (
                    <Badge variant="warn" className="h-5 px-2 text-[10px]">
                      Required
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="h-5 px-2 text-[10px]">
                      Optional
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-text-3">
                  {CATEGORY_LABEL[doc.category] ?? doc.category} ·{" "}
                  {doc.description}
                </div>
              </div>
              <ChevronRight className="size-4 shrink-0 text-text-3" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function DocsSkeleton() {
  return (
    <ul className="mt-3 divide-y divide-border">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 py-3">
          <Skeleton className="size-9 rounded-md" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function CommonQuestionsCard({ opportunity }: Props) {
  const { data, isLoading, error } = useEndpoint(
    `/opportunities/${opportunity.source}/${opportunity.id}/faq`,
    () => getOpportunityFaq(opportunity.source, opportunity.id),
  )

  const entries = data?.entries ?? []

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-display text-base font-semibold text-foreground">
        Common questions
      </h3>

      {entries.length === 0 ? (
        isLoading ? (
          <FaqSkeleton />
        ) : error ? (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-3 text-sm text-text-3">
            No FAQs for this one — ask Copilot.
          </p>
        )
      ) : (
        <ul className="mt-3 divide-y divide-border">
          {entries.map((qa) => (
            <li key={qa.question} className="py-3">
              <div className="text-sm font-semibold text-foreground">
                {qa.question}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-text-2">
                {qa.answer}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FaqSkeleton() {
  return (
    <ul className="mt-3 divide-y divide-border">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="py-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
        </li>
      ))}
    </ul>
  )
}
