"use client"

import { useMemo, type RefObject } from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { TransactionCategory } from "@/lib/enum"

type CategoryOption = {
  value: TransactionCategory | ""
  label: string
}

type CategoryComboboxProps = {
  value: TransactionCategory | ""
  onChange: (next: TransactionCategory | "") => void
  // See BankCombobox — when rendered inside a Radix Dialog/Sheet pass the
  // sheet content ref so the dropdown portals into the same tree.
  container?: RefObject<HTMLElement | null> | HTMLElement | null
}

function humanize(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const OPTIONS: ReadonlyArray<CategoryOption> = [
  { value: "", label: "Let Trace decide" },
  ...Object.values(TransactionCategory).map((c) => ({
    value: c,
    label: humanize(c),
  })),
]

// Searchable category picker. Mirrors BankCombobox so the SendSheet stays
// stylistically consistent. The empty-string option lets the backend infer the
// category from the recipient (FOOD_AND_DINING for Chowdeck, etc.).
export function CategoryCombobox({
  value,
  onChange,
  container,
}: CategoryComboboxProps) {
  const selected = useMemo(
    () => OPTIONS.find((o) => o.value === value) ?? OPTIONS[0],
    [value],
  )

  return (
    <Combobox
      items={OPTIONS}
      value={selected}
      onValueChange={(next: CategoryOption | null) =>
        onChange(next?.value ?? "")
      }
      itemToStringLabel={(o: CategoryOption) => o.label}
      itemToStringValue={(o: CategoryOption) => o.value || "__auto__"}
    >
      <ComboboxInput placeholder="Search a category…" />
      <ComboboxContent container={container}>
        <ComboboxList>
          {/* Function child = base-ui renders the filtered subset and the
              selection callback fires correctly. Static children break this. */}
          {(option: CategoryOption) => (
            <ComboboxItem key={option.value || "__auto__"} value={option}>
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No categories match.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
