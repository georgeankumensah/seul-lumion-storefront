"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GalleryItem {
  image: string
  title: string
  subtitle?: string
  link: string
}

interface HorizontalGalleryProps {
  items: GalleryItem[]
}

export function HorizontalGallery({ items }: HorizontalGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative group">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4"
        onScroll={checkScroll}
      >
        {items.map((item, i) => (
          <a key={i} href={item.link} className="relative flex-none w-[300px] md:w-[400px] aspect-[4/3] snap-start">
            <div className="absolute inset-0">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              {item.subtitle && <p className="text-sm">{item.subtitle}</p>}
            </div>
          </a>
        ))}
      </div>

      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
          !canScrollLeft && "hidden",
        )}
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
          !canScrollRight && "hidden",
        )}
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

