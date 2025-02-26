"use client"
import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import { useEffect } from "react"
import { getUser } from "@/lib/auth"
import "@/styles/globals.css"
import { Metadata as NextMetadata } from 'next';


type CustomMetadata = NextMetadata & {
  meta: {
    name: string;
    content: string;
  }[];
}; 

export const metadata: CustomMetadata = {
  title: "Peso - Contemporary Fashion",
  description: "Shop the latest contemporary fashion at Peso",
  meta: [
    {
      name: "google-site-verification",
      content: "Obu7K2aofd4rR9gMAigeCdRreFbZfc9liMYVWxkP5Dc",
    },
  ],
};

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






