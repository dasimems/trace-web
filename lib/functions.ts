import {
  format,
  differenceInHours,
  differenceInMinutes,
  isToday,
  isYesterday,
} from "date-fns"

/**
 * Format a date as:
 *  - "Today, 2:30 PM" if it's today
 *  - "Yesterday, 2:30 PM" if it's yesterday
 *  - "20 July, 2:30 PM" otherwise
 */
export function formatSmartDate(date: Date) {
  const now = new Date()
  const diffInMinutes = differenceInMinutes(now, date)
  const diffInHours = differenceInHours(now, date)

  if (diffInMinutes < 1) {
    return "Now"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`
  }

  if (diffInHours < 12 && isToday(date)) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  }

  if (isToday(date)) {
    return `Today, ${format(date, "h:mmaaa")}`
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mmaaa")}`
  }

  return `${format(date, "d MMMM, h:mmaaa")}`
}
