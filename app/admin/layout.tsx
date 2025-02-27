import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { ConnectionStatus } from "@/components/admin/connection-status"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requireAdmin>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
          <AdminSidebar />
        </div>
        <main className="md:pl-72">
          <div className="flex items-center justify-end p-4">
            <ConnectionStatus />
          </div>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}

