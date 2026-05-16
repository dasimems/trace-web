"use client"

import { forwardRef, type ChangeEvent } from "react"

import { Input } from "@/components/ui/input"

type NumericInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "type" | "inputMode"
> & {
  onChange?: (value: string) => void
  /** Maximum digits the input will accept. */
  maxDigits?: number
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  function NumericInput({ onChange, maxDigits, value, ...rest }, ref) {
    function strip(raw: string): string {
      const digits = raw.replace(/\D/g, "")
      return maxDigits ? digits.slice(0, maxDigits) : digits
    }

    function handle(e: ChangeEvent<HTMLInputElement>) {
      const next = strip(e.target.value)
      if (next !== e.target.value) {
        e.target.value = next
      }
      onChange?.(next)
    }

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value ?? ""}
        onChange={handle}
        maxLength={maxDigits}
        {...rest}
      />
    )
  },
)
