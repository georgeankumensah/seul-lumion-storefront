import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function Brand() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[70vh] mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/placeholder.svg?height=800&width=1200)`,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-center">
            <div className="max-w-3xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
              <p className="text-lg md:text-xl mb-8">Crafting contemporary fashion with purpose since 2020</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Quality</h3>
                <p className="text-gray-600">Premium materials and expert craftsmanship in every piece</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                <p className="text-gray-600">Committed to ethical production and environmental responsibility</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Design</h3>
                <p className="text-gray-600">Contemporary aesthetics meet timeless style</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="/placeholder.svg?height=600&width=600" alt="Brand Story" className="w-full h-auto" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
                <div className="prose">
                  <p>
                    Founded in 2020, Peso began with a simple mission: to create contemporary fashion that stands the
                    test of time. Our journey started in a small studio in New York, where we crafted our first
                    collection of essential pieces.
                  </p>
                  <p>
                    Today, we continue to push boundaries while staying true to our core values of quality,
                    sustainability, and innovative design. Each piece in our collection is thoughtfully designed and
                    crafted to become a lasting part of your wardrobe.
                  </p>
                </div>
                <Button className="mt-8">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

