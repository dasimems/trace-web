"use client"

import { forwardRef, type ChangeEvent } from "react"

import { Input } from "@/components/ui/input"

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "type" | "inputMode"
> & {
  onChange?: (value: string) => void
  /** Maximum digits after the leading +. Defaults to 15 (E.164). */
  maxDigits?: number
}

function normalize(raw: string, maxDigits: number): string {
  // Always preserve a leading + if the user typed one OR auto-prepend if they
  // started typing digits.
  const hasLeadingPlus = raw.startsWith("+")
  const digits = raw.replace(/\D/g, "").slice(0, maxDigits)
  if (!digits) return hasLeadingPlus ? "+" : ""
  return `+${digits}`
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput({ onChange, maxDigits = 15, value, ...rest }, ref) {
    function handle(e: ChangeEvent<HTMLInputElement>) {
      const next = normalize(e.target.value, maxDigits)
      if (next !== e.target.value) {
        e.target.value = next
      }
      onChange?.(next)
    }

    return (
      <Input
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={value ?? ""}
        onChange={handle}
        maxLength={maxDigits + 1}
        {...rest}
      />
    )
  },
)
