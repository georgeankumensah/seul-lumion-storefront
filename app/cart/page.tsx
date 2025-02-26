"use client"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import Link from "next/link"
import { CouponInput } from "@/components/cart/coupon-input"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, coupon, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button asChild>
                <Link href="/shop-all">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 py-6 border-b">
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-500 mb-4">Size: {item.size}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-2">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-4">
                  <CouponInput />
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {coupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${coupon.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full">Proceed to Checkout</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

