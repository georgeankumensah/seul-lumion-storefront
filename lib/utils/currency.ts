import { currencies } from "@/lib/i18n/config"

export function formatCurrency(amount: number, currency = "USD", locale = "en") {
  const currencyInfo = currencies.find((c) => c.code === currency)
  if (!currencyInfo) return `$${amount.toFixed(2)}`

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount)
}

// This would typically use an exchange rate API
// For demo purposes, we'll use static conversion rates
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110,
  CNY: 6.45,
  KRW: 1150,
  NGN: 410,
}

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from === to) return amount
  const usdAmount = amount / (exchangeRates[from] || 1)
  return usdAmount * (exchangeRates[to] || 1)
}

