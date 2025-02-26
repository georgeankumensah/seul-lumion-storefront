"use client"

import Link from "next/link"
import { Search, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/lib/hooks/use-cart"
import CartSheet from "../cart/cart-sheet"
import MobileMenu from "./mobile-menu"
import { LanguageSelector } from "./language-selector"
import { CurrencySelector } from "./currency-selector"

export default function Header() {
  const { user } = useAuth()
  const { items } = useCart()

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-semibold text-xl">
          <img
            src="https://pesoclo.com/cdn/shop/files/PESO_LOGO_BLACK_150x.png?v=1614334615"
            alt="Peso"
            className="h-6 w-auto"
          />
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/new-in" className="text-sm tracking-widest hover:text-gray-600">
            NEW IN
          </Link>
          <Link href="/shop-all" className="text-sm tracking-widest hover:text-gray-600">
            SHOP ALL
          </Link>
          <Link href="/basics" className="text-sm tracking-widest hover:text-gray-600">
            BASICS
          </Link>
          <Link href="/brand" className="text-sm tracking-widest hover:text-gray-600">
            BRAND
          </Link>
        </nav>

        {/* Right Navigation */}
        <div className="flex items-center space-x-6">
          <LanguageSelector />
          <CurrencySelector />
          <Link href="/search" className="hover:text-gray-600">
            <Search className="h-5 w-5" />
          </Link>
          <Link href={user ? "/account" : "/login"} className="hover:text-gray-600">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/loyalty" className="hidden md:block text-sm tracking-widest hover:text-gray-600">
            LOYALTY
          </Link>
          <CartSheet />
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

