"use client"

import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import type { CartItem as CartItemType } from "@/types"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4">
      <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
        <img src={item.images[0] || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">{item.name}</h3>
          <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center border">
            <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-1">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

