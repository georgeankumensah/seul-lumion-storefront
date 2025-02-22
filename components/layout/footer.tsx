import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold mb-4">ABOUT PESO</h3>
            <p className="text-sm text-gray-400">Contemporary fashion brand focused on quality and design.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">QUICK LINKS</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/search" className="text-sm text-gray-400 hover:text-white">
                Search
              </Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-white">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                Contact
              </Link>
              <Link href="/shipping" className="text-sm text-gray-400 hover:text-white">
                Shipping Policy
              </Link>
            </nav>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold mb-4">ACCOUNT</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/account" className="text-sm text-gray-400 hover:text-white">
                My Account
              </Link>
              <Link href="/orders" className="text-sm text-gray-400 hover:text-white">
                Order History
              </Link>
              <Link href="/wishlist" className="text-sm text-gray-400 hover:text-white">
                Wishlist
              </Link>
              <Link href="/newsletter" className="text-sm text-gray-400 hover:text-white">
                Newsletter
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-4">NEWSLETTER</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="bg-white/10 px-4 py-2 text-sm flex-1" />
              <button className="bg-white text-black px-4 py-2 text-sm hover:bg-gray-200">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

