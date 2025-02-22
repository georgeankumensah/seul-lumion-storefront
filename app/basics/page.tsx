import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ProductCard from "@/components/product/product-card"
import { products } from "@/lib/data"

export default function Basics() {
  // Filter products to show only basics collection
  const basicProducts = products.filter((p) => p.category === "basics")

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">The Basics</h1>
            <p className="text-gray-600">
              Timeless essentials crafted from premium materials. Our basics collection features everyday pieces
              designed for comfort and style.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {basicProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

