"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const nextImage = () => {
    setGalleryIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setGalleryIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-100 cursor-zoom-in" onClick={() => setIsOpen(true)}>
        <img src={images[mainImage] || "/placeholder.svg"} alt="Product" className="w-full h-full object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, i) => (
          <button
            key={i}
            className={`aspect-square bg-gray-100 ${i === mainImage ? "ring-2 ring-black" : ""}`}
            onClick={() => setMainImage(i)}
          >
            <img src={image || "/placeholder.svg"} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl bg-white/95 backdrop-blur-sm">
          <div className="relative h-[80vh]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 p-2 bg-white/80 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="h-full flex items-center justify-center">
              <button onClick={previousImage} className="absolute left-4 p-2 bg-white/80 rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </button>

              <img
                src={images[galleryIndex] || "/placeholder.svg"}
                alt="Product"
                className="max-h-full max-w-full object-contain"
              />

              <button onClick={nextImage} className="absolute right-4 p-2 bg-white/80 rounded-full">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

