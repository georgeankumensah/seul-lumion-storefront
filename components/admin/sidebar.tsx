"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Package,
  TagsIcon as Categories,
  ImageIcon,
  BarChart,
  Ticket,
} from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Products",
    icon: Package,
    href: "/admin/products",
    color: "text-violet-500",
  },
  {
    label: "Categories",
    icon: Categories,
    href: "/admin/categories",
    color: "text-pink-700",
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    href: "/admin/orders",
    color: "text-orange-700",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/admin/customers",
    color: "text-green-700",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/admin/analytics",
    color: "text-yellow-700",
  },
  {
    label: "Media",
    icon: ImageIcon,
    href: "/admin/media",
    color: "text-purple-700",
  },
  {
    label: "Coupons",
    icon: Ticket,
    href: "/admin/coupons",
    color: "text-purple-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 text-gray-800">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200/50 rounded-lg transition",
                pathname === route.href ? "text-gray-900 bg-gray-200" : "text-gray-600",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

