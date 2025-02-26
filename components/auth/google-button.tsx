"use client"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Loader2 } from "lucide-react"
import { useState } from "react"

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, config: any) => void
        }
      }
    }
  }
}

export function GoogleButton() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCredentialResponse = async (response: any) => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      })

      if (!res.ok) throw new Error("Authentication failed")

      const data = await res.json()
      router.refresh()
      router.push("/account")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID")
    return null
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.google) {
            window.google.accounts.id.initialize({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              callback: handleCredentialResponse,
            })
            window.google.accounts.id.renderButton(document.getElementById("google-button")!, {
              theme: "outline",
              size: "large",
              width: 250,
              text: "signin_with",
            })
          }
        }}
      />
      <div className="relative">
        <div id="google-button" className="mt-4"></div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>
    </>
  )
}

