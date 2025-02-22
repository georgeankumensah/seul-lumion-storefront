"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/types"

interface CartItem extends Product {
  quantity: number
  size: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id && item.size === size)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1, size }],
          })
        }

        // Update total
        set((state) => ({
          total: state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }))
      },
      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id)
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          }
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          }
        }),
      clearCart: () => set({ items: [], total: 0 }),
      total: 0,
    }),
    {
      name: "cart-storage",
    },
  ),
)

