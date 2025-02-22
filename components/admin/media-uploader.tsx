"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface MediaUploaderProps {
  onUploadStart: () => void
  onUploadEnd: () => void
}

export function MediaUploader({ onUploadStart, onUploadEnd }: MediaUploaderProps) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setLoading(true)
    onUploadStart()

    try {
      // Handle file upload
      // In a real app, you would upload to your storage service
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } finally {
      setLoading(false)
      onUploadEnd()
    }
  }

  return (
    <div>
      <input type="file" id="media-upload" className="hidden" multiple accept="image/*" onChange={handleUpload} />
      <Button disabled={loading} onClick={() => document.getElementById("media-upload")?.click()}>
        <Upload className="mr-2 h-4 w-4" />
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  )
}

