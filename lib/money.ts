// Strongly-typed mirror of the backend `Price` object. Every monetary field
// in the API contract is shaped like this; helpers below operate on it
// directly.
export type TPrice = {
  amount: number
  currency: {
    code: string
    symbol: string
    name: string
    locale: string
  }
  formatted: {
    withCurrency: string
    withoutCurrency: string
  }
  parts: {
    whole: number
    subUnit: number
    smallestUnit: number
  }
}

export const formatPrice = (price: TPrice) => price.formatted.withCurrency

export const formatPriceCompact = (price: TPrice) => {
  const compact = new Intl.NumberFormat(price.currency.locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  })
  return `${price.currency.symbol}${compact.format(price.amount)}`
}

export const splitPriceParts = (price: TPrice) => ({
  whole: `${price.currency.symbol}${price.parts.whole.toLocaleString(
    price.currency.locale,
  )}`,
  decimal: `.${price.parts.subUnit.toString().padStart(2, "0")}`,
})
