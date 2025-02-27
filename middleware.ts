import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"
import { defaultLocale } from "./lib/i18n/config"

const publicRoutes = ["/", "/shop-all", "/new-in", "/basics", "/brand", "/search"]
const authRoutes = ["/login", "/register", "/forgot-password"]
const protectedRoutes = ["/account", "/orders", "/checkout", "/cart"]
const adminRoutes = ["/admin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")

  // Get locale from cookie or default
  const locale = request.cookies.get("locale")?.value || defaultLocale

  // Handle admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("from", pathname)
      return NextResponse.redirect(url)
    }

    const payload = await verifyToken(token.value)
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Handle protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("from", pathname)
      return NextResponse.redirect(url)
    }

    const payload = await verifyToken(token.value)
    if (!payload) {
      const url = new URL("/login", request.url)
      url.searchParams.set("from", pathname)
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.includes(pathname) && token) {
    const payload = await verifyToken(token.value)
    if (payload) {
      const from = request.nextUrl.searchParams.get("from") || "/"
      return NextResponse.redirect(new URL(from, request.url))
    }
  }

  // Add locale to headers for server components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", locale)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Set locale cookie if it doesn't exist
  if (!request.cookies.has("locale")) {
    response.cookies.set("locale", locale)
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

