"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MediaUploader } from "@/components/admin/media-uploader"
import { ImageIcon, Trash2 } from "lucide-react"

const media = [
  {
    id: "1",
    url: "/placeholder.svg",
    name: "product-1.jpg",
    size: "1.2MB",
    uploadedAt: new Date(),
  },
  // Add more media...
]

export default function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const handleDelete = async () => {
    // Handle delete
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
        <div className="flex items-center space-x-2">
          {selectedMedia.length > 0 && (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          )}
          <MediaUploader onUploadStart={() => setUploading(true)} onUploadEnd={() => setUploading(false)} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className={`relative aspect-square rounded-md border-2 ${
              selectedMedia.includes(item.id) ? "border-primary" : "border-border"
            }`}
            onClick={() => {
              if (selectedMedia.includes(item.id)) {
                setSelectedMedia(selectedMedia.filter((id) => id !== item.id))
              } else {
                setSelectedMedia([...selectedMedia, item.id])
              }
            }}
          >
            {item.url ? (
              <img
                src={item.url || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent text-white text-xs truncate rounded-b-md">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

