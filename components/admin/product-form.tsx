"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { MediaPicker } from "./media-picker"

interface ProductFormProps {
  open: boolean
  onClose: () => void
  initialData?: any
  onSuccess: () => void
}

export function ProductForm({ open, onClose, initialData, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())

      const url = initialData ? `/api/products/${initialData.id}` : "/api/products"

      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images,
          price: Number.parseFloat(data.price as string),
          stock: Number.parseInt(data.stock as string),
        }),
      })

      if (!res.ok) throw new Error("Failed to save product")

      toast({
        title: "Success",
        description: `Product ${initialData ? "updated" : "created"} successfully`,
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${initialData ? "update" : "create"} product`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={initialData?.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={initialData?.slug} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" defaultValue={initialData?.price} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" defaultValue={initialData?.stock} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={initialData?.description} required />
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            <MediaPicker value={images} onChange={setImages} maxFiles={4} />
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

