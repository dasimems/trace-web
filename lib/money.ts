const NAIRA_FORMATTER = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 2,
})

const NAIRA_COMPACT_FORMATTER = new Intl.NumberFormat("en-NG", {
  notation: "compact",
  maximumFractionDigits: 1,
})

const NAIRA_NO_DECIMALS_FORMATTER = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
})

export const koboToNaira = (kobo: number) => kobo / 100

export const formatNaira = (kobo: number) =>
  NAIRA_FORMATTER.format(koboToNaira(kobo))

export const formatNairaWhole = (kobo: number) =>
  NAIRA_NO_DECIMALS_FORMATTER.format(koboToNaira(kobo))

export const formatNairaCompact = (kobo: number) => {
  const value = koboToNaira(kobo)
  return `₦${NAIRA_COMPACT_FORMATTER.format(value)}`
}

export const splitNairaParts = (kobo: number) => {
  const naira = koboToNaira(kobo)
  const whole = Math.trunc(naira)
  const decimal = Math.round((Math.abs(naira) - Math.abs(whole)) * 100)
  return {
    whole: `₦${whole.toLocaleString("en-NG")}`,
    decimal: `.${decimal.toString().padStart(2, "0")}`,
  }
}
