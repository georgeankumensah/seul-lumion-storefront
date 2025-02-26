import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { headers } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import "@/styles/globals.css"

async function getLocale() {
  const headersList = headers()
  return headersList.get("x-locale") || "en"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const dictionary = await getDictionary(locale)

  return (
    <html lang={locale}>
      <body>
        <AuthProvider dictionary={dictionary}>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
