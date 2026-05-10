"use client"

import { useRef } from "react"
import { ScanLine } from "lucide-react"

import { Button } from "@/components/ui/button"

type FileUploadZoneProps = {
  name?: string
  accept?: string
  title: string
  hint: string
  buttonLabel?: string
}

export function FileUploadZone({
  name = "id_upload",
  accept = "image/*,.pdf",
  title,
  hint,
  buttonLabel = "Browse",
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <label
      htmlFor={`${name}-input`}
      className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-border bg-card/40 p-5 transition-colors hover:border-lime-300 hover:bg-lime-50/40 dark:hover:border-lime-500/40 dark:hover:bg-lime-500/5"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-lime-500 dark:bg-lime-500/15 dark:text-lime-400">
        <ScanLine className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-display text-sm font-semibold leading-snug text-foreground">
          {title}
        </div>
        <div className="mt-1 text-sm text-text-3">{hint}</div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-9 rounded-full px-4"
        onClick={(e) => {
          e.preventDefault()
          inputRef.current?.click()
        }}
      >
        {buttonLabel}
      </Button>
      <input
        ref={inputRef}
        id={`${name}-input`}
        name={name}
        type="file"
        accept={accept}
        className="sr-only"
      />
    </label>
  )
}
