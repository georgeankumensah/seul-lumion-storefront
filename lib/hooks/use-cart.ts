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
  coupon?: {
    code: string
    discount: number
    type: "percentage" | "fixed"
    value: number
  }
  addItem: (product: Product, size: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  applyCoupon: (coupon: any) => void
  removeCoupon: () => void
  clearCart: () => void
  subtotal: number
  total: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: undefined,
      subtotal: 0,
      total: 0,
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

        // Update totals
        set((state) => {
          const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
          const discount = state.coupon?.discount || 0
          return {
            subtotal,
            total: subtotal - discount,
          }
        })
      },
      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id)
          const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          const discount = state.coupon?.discount || 0
          return {
            items: newItems,
            subtotal,
            total: subtotal - discount,
          }
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
          const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          const discount = state.coupon?.discount || 0
          return {
            items: newItems,
            subtotal,
            total: subtotal - discount,
          }
        }),
      applyCoupon: (coupon) =>
        set((state) => ({
          coupon: {
            code: coupon.code,
            type: coupon.type,
            value: coupon.value,
            discount: coupon.discount,
          },
          total: state.subtotal - coupon.discount,
        })),
      removeCoupon: () =>
        set((state) => ({
          coupon: undefined,
          total: state.subtotal,
        })),
      clearCart: () => set({ items: [], coupon: undefined, subtotal: 0, total: 0 }),
    }),
    {
      name: "cart-storage",
    },
  ),
)

