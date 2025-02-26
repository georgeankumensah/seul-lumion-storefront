import { format } from "date-fns"
import { enUS, es, type Locale } from "date-fns/locale"

const locales: { [key: string]: Locale } = {
  en: enUS,
  es: es,
}

export function formatDate(date: Date | string, formatStr = "PPP", locale = "en") {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, formatStr, {
    locale: locales[locale] || enUS,
  })
}

export function formatPrice(amount: number, currency = "USD", locale = "en") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount)
}

