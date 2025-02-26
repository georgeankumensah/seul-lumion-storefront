interface Banner {
  image: string
  title: string
  subtitle?: string
  buttonText: string
  buttonLink: string
}

interface PromotionalBannersProps {
  banners: Banner[]
}

export function PromotionalBanners({ banners }: PromotionalBannersProps) {
  return (
    <div className="grid gap-8">
      {banners.map((banner, i) => (
        <div key={i} className="relative h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.image || "/placeholder.svg"})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">{banner.title}</h3>
              {banner.subtitle && <p className="text-lg mb-6">{banner.subtitle}</p>}
              <a
                href={banner.buttonLink}
                className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
              >
                {banner.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

