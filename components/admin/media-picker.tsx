"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface MediaPickerProps {
  value: string[]
  onChange: (value: string[]) => void
  maxFiles?: number
}

export function MediaPicker({ value = [], onChange, maxFiles = 4 }: MediaPickerProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    if (value.length + files.length > maxFiles) {
      toast({
        title: "Error",
        description: `You can only upload up to ${maxFiles} files`,
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/media", {
          method: "POST",
          body: formData,
        })

        if (!res.ok) throw new Error("Upload failed")

        const data = await res.json()
        return data.url
      })

      const urls = await Promise.all(uploadPromises)
      onChange([...value, ...urls])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={url || "/placeholder.svg"}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {value.length < maxFiles && (
          <div className="aspect-square border-2 border-dashed rounded-md flex items-center justify-center">
            <input
              type="file"
              id="media-upload"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleUpload}
              disabled={loading}
            />
            <Button
              type="button"
              variant="ghost"
              disabled={loading}
              onClick={() => document.getElementById("media-upload")?.click()}
            >
              <ImagePlus className="h-8 w-8" />
            </Button>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Upload up to {maxFiles} images. Supported formats: PNG, JPG, JPEG.
      </p>
    </div>
  )
}

