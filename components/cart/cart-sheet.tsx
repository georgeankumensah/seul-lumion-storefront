"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/hooks/use-cart"
import Link from "next/link"
import CartItem from "./cart-item"

export default function CartSheet() {
  const { items, total } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="hover:text-gray-600 flex items-center">
          <ShoppingCart className="h-5 w-5" />
          <span className="ml-1 text-sm">({items.length})</span>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto py-6">
            {items.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button asChild variant="outline">
                  <Link href="/shop-all">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <CartItem key={`${item.id}-${item.size}`} item={item} />
                ))}
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/cart">Proceed to Checkout</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

