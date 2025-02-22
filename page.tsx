import Link from "next/link"
import { Search, User, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
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
            <button className="hover:text-gray-600">
              <Search className="h-5 w-5" />
            </button>
            <button className="hover:text-gray-600">
              <User className="h-5 w-5" />
            </button>
            <Link href="/loyalty" className="hidden md:block text-sm tracking-widest hover:text-gray-600">
              LOYALTY
            </Link>
            <button className="hover:text-gray-600 flex items-center">
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-1 text-sm">(0)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${encodeURI("https://sjc.microlink.io/zRctH4H6Z5wn3giYQbL7pJ650JLWnuwoD-g6Inq0ULYxShjhmrD4V2wQEpq0Kganz0J5EPpzr9rQvLniZc7pXw.jpeg")})`,
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 pb-32">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">SPRING 2025</h1>
            <Button
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100 rounded-none px-8 py-6 text-sm tracking-widest"
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

