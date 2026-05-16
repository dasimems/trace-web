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
import { useEndpoint } from "@/hooks/use-endpoint"
import { getBanks, type TBank } from "@/api/wallet"

type BankComboboxProps = {
  value: string
  onChange: (bankCode: string) => void
  // Optional dialog/sheet root the dropdown should portal into. Required when
  // rendering inside a Radix Dialog so outside-click detection doesn't swallow
  // selection clicks.
  container?: RefObject<HTMLElement | null> | HTMLElement | null
}

// Searchable bank picker. Reads /wallet/banks via TanStack Query so the result
// is shared across whatever else in the dashboard needs the list (cached for
// the QueryClient's staleTime).
export function BankCombobox({ value, onChange, container }: BankComboboxProps) {
  const { data, isLoading, error } = useEndpoint("/wallet/banks", getBanks)
  const banks = useMemo(() => data ?? [], [data])
  const selected = banks.find((b) => b.code === value) ?? null

  const placeholder = isLoading
    ? "Loading banks…"
    : error
      ? "Couldn't load banks — tap to retry"
      : banks.length === 0
        ? "No banks available"
        : "Search a bank…"

  return (
    <div className="space-y-1.5">
      <Combobox
        items={banks}
        value={selected}
        onValueChange={(next: TBank | null) => onChange(next?.code ?? "")}
        itemToStringLabel={(bank: TBank) => bank.name}
        itemToStringValue={(bank: TBank) => bank.code}
      >
        <ComboboxInput
          placeholder={placeholder}
          disabled={isLoading || banks.length === 0}
          showClear={Boolean(selected)}
        />
        <ComboboxContent container={container}>
          <ComboboxList>
            {/* Base-ui expects a function child on List so it can render the
                filtered subset as the user types — passing static children
                bypasses the filter pipeline and breaks selection dispatch. */}
            {(bank: TBank) => (
              <ComboboxItem key={bank.code} value={bank}>
                {bank.name}
              </ComboboxItem>
            )}
          </ComboboxList>
          <ComboboxEmpty>No banks match.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
      {error && (
        <p className="text-xs text-destructive">
          {error} — check your connection or that the wallet/banks endpoint is
          reachable.
        </p>
      )}
    </div>
  )
}
