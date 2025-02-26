"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import ImageGallery from "@/components/product/image-gallery"
import { useCart } from "@/lib/hooks/use-cart"
import { useToast } from "@/components/ui/use-toast"
import { RelatedProducts } from "@/components/product/related-products"
import { useLocale } from "@/lib/hooks/use-locale"
import { formatPrice } from "@/lib/utils/format"
import { useDictionary } from "@/lib/hooks/use-dictionary"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug) || products[0]
  const [selectedSize, setSelectedSize] = useState("")
  const { addItem } = useCart()
  const { toast } = useToast()
  const { locale, currency } = useLocale()
  const dictionary = useDictionary()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: dictionary?.product?.selectSize || "Please select a size",
        variant: "destructive",
      })
      return
    }

    addItem(product, selectedSize)
    toast({
      title: dictionary?.product?.addedToCart || "Added to cart",
      description: `${product.name} - ${dictionary?.product?.size || "Size"} ${selectedSize}`,
    })
  }

  if (!dictionary) {
    return null // Or loading state
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <ImageGallery images={product.images} />

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl">{formatPrice(product.price, currency, locale)}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{dictionary.product.size}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className={`border py-2 hover:bg-black hover:text-white ${
                          selectedSize === size ? "bg-black text-white" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="w-full py-6" onClick={handleAddToCart}>
                {dictionary.product.addToCart}
              </Button>

              <div className="prose prose-sm">
                <h3>{dictionary.product.description}</h3>
                <p>{product.description}</p>

                <h3>{dictionary.product.details}</h3>
                <ul>
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <RelatedProducts currentProduct={product} />
        </div>
      </main>
      <Footer />
    </>
  )
}

