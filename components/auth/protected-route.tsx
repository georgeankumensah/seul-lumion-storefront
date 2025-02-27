"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?from=${encodeURIComponent(pathname)}`)
      } else if (requireAdmin && user.role !== "admin") {
        router.push("/")
      }
    }
  }, [loading, user, requireAdmin, router, pathname])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || (requireAdmin && user.role !== "admin")) {
    return null
  }

  return <>{children}</>
}

