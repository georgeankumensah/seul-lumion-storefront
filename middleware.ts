import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"
import { defaultLocale } from "./lib/i18n/config"

const protectedRoutes = ["/account", "/orders", "/checkout"]
const adminRoutes = ["/admin"]
const authRoutes = ["/login", "/register", "/forgot-password"]

export async function middleware(request: NextRequest) {
  // Get locale from cookie or default
  const locale = request.cookies.get("locale")?.value || defaultLocale

  const token = request.cookies.get("auth-token")
  const { pathname } = request.nextUrl

  // Check admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const payload = await verifyToken(token.value)
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Check protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.set({
        name: "redirect-url",
        value: pathname,
        maxAge: 60 * 5,
      })
      return response
    }
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Clone the URL to add locale
  const newUrl = new URL(request.url)

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

