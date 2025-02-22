"use client"
import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import { useEffect } from "react"
import { getUser } from "@/lib/auth"
import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(()=>{
    getUser()
  },
    []
  )
  return (
    <html lang="en">
      <body>
       
          {children}
          <Toaster />
      </body>
    </html>
  )
}






