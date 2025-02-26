"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/hooks/use-cart"

export function CouponInput() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { subtotal, applyCoupon, removeCoupon, coupon } = useCart()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          subtotal,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      applyCoupon({
        code: data.coupon.code,
        type: data.coupon.type,
        value: data.coupon.value,
        discount: data.discount,
      })

      toast({
        title: "Success",
        description: "Coupon applied successfully",
      })
      setCode("")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to apply coupon",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between bg-muted p-2 rounded-md">
        <div>
          <p className="text-sm font-medium">Coupon applied: {coupon.code}</p>
          <p className="text-sm text-muted-foreground">
            {coupon.type === "percentage" ? `${coupon.value}% off` : `$${coupon.value} off`}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            removeCoupon()
            setCode("")
          }}
        >
          Remove
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Enter coupon code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        className="uppercase"
      />
      <Button type="submit" disabled={!code || loading}>
        {loading ? "Applying..." : "Apply"}
      </Button>
    </form>
  )
}

