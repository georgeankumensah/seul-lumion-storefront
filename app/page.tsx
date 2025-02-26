import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { HorizontalGallery } from "@/components/home/horizontal-gallery"
import { FeaturedCollections } from "@/components/home/featured-collections"
import { PromotionalBanners } from "@/components/home/promotional-banners"
import { getHomeContent } from "@/lib/api/home"

export default async function Home() {
  const content = await getHomeContent()

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${content?.hero?.image || "/placeholder.svg?height=1080&width=1920"})`,
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 pb-32">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{content?.hero?.title || "Welcome"}</h1>
              {content?.hero?.subtitle && <p className="text-xl text-white mb-6">{content.hero.subtitle}</p>}
              <Button
                variant="secondary"
                className="bg-white text-black hover:bg-gray-100 rounded-none px-8 py-6 text-sm tracking-widest"
                asChild
              >
                <a href={content?.hero?.buttonLink || "/shop-all"}>{content?.hero?.buttonText || "SHOP NOW"}</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Horizontal Gallery */}
        {content?.gallery && content.gallery.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <HorizontalGallery items={content.gallery} />
            </div>
          </section>
        )}

        {/* Featured Collections */}
        {content?.featuredCollections && content.featuredCollections.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
              <FeaturedCollections collections={content.featuredCollections} />
            </div>
          </section>
        )}

        {/* Promotional Banners */}
        {content?.promotionalBanners && content.promotionalBanners.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <PromotionalBanners banners={content.promotionalBanners} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

