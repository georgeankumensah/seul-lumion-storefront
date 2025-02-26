"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface CouponFormProps {
  open: boolean
  onClose: () => void
  initialData?: any
  onSuccess: () => void
}

export function CouponForm({ open, onClose, initialData, onSuccess }: CouponFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())

      // Convert string values to numbers where needed
      data.value = Number(data.value)
      data.minPurchase = Number(data.minPurchase)
      data.usageLimit = Number(data.usageLimit) || null
      data.perUserLimit = Number(data.perUserLimit) || 1
      data.isActive = data.isActive === "true"

      const url = initialData ? `/api/coupons/${initialData.code}` : "/api/coupons"

      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to save coupon")

      toast({
        title: "Success",
        description: `Coupon ${initialData ? "updated" : "created"} successfully`,
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${initialData ? "update" : "create"} coupon`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Coupon Code</Label>
            <Input
              id="code"
              name="code"
              defaultValue={initialData?.code}
              required
              disabled={!!initialData}
              placeholder="SUMMER2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Discount Type</Label>
            <Select name="type" defaultValue={initialData?.type || "percentage"}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Discount Value</Label>
            <Input
              id="value"
              name="value"
              type="number"
              min="0"
              step="0.01"
              defaultValue={initialData?.value}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minPurchase">Minimum Purchase</Label>
            <Input
              id="minPurchase"
              name="minPurchase"
              type="number"
              min="0"
              step="0.01"
              defaultValue={initialData?.minPurchase || 0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usageLimit">Usage Limit</Label>
            <Input
              id="usageLimit"
              name="usageLimit"
              type="number"
              min="1"
              defaultValue={initialData?.usageLimit}
              placeholder="Leave empty for unlimited"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {initialData?.endDate ? format(new Date(initialData.endDate), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={initialData?.endDate ? new Date(initialData.endDate) : undefined}
                  onSelect={(date) => {
                    const input = document.createElement("input")
                    input.type = "hidden"
                    input.name = "endDate"
                    input.value = date?.toISOString() || ""
                    document.forms[0].appendChild(input)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Active</Label>
            <Switch id="isActive" name="isActive" defaultChecked={initialData?.isActive ?? true} />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

