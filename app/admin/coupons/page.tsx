"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CouponForm } from "@/components/admin/coupon-form"
import { useCoupons } from "@/lib/hooks/use-coupons"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export default function CouponsPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<any>(null)
  const { coupons, isLoading, mutate } = useCoupons()
  const { toast } = useToast()

  const handleDelete = async (code: string) => {
    try {
      const res = await fetch(`/api/coupons/${code}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete coupon")

      mutate()
      toast({
        title: "Success",
        description: "Coupon deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete coupon",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Coupons</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Coupon
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons?.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell className="font-medium">{coupon.code}</TableCell>
                <TableCell>{coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value}`}</TableCell>
                <TableCell>
                  {coupon.usageCount} / {coupon.usageLimit || "∞"}
                </TableCell>
                <TableCell>{coupon.endDate ? format(new Date(coupon.endDate), "MMM d, yyyy") : "No expiry"}</TableCell>
                <TableCell>
                  <Badge variant={coupon.isActive ? "default" : "secondary"}>
                    {coupon.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setEditingCoupon(coupon)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(coupon.code)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CouponForm
        open={isCreating || !!editingCoupon}
        onClose={() => {
          setIsCreating(false)
          setEditingCoupon(null)
        }}
        initialData={editingCoupon}
        onSuccess={() => {
          mutate()
          setIsCreating(false)
          setEditingCoupon(null)
        }}
      />
    </div>
  )
}

