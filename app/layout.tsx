"use client"
import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import { useEffect } from "react"
import { getUser } from "@/lib/auth"
import "@/styles/globals.css"
import Head from "next/head"




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
      <Head>
      <meta name="google-site-verification" content="Obu7K2aofd4rR9gMAigeCdRreFbZfc9liMYVWxkP5Dc" />
      </Head>
      <body>
       
          {children}
          <Toaster />
      </body>
    </html>
  )
}






