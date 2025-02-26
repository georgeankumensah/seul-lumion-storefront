interface Collection {
  image: string
  title: string
  link: string
}

interface FeaturedCollectionsProps {
  collections: Collection[]
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {collections.map((collection, i) => (
        <a key={i} href={collection.link} className="group">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              src={collection.image || "/placeholder.svg"}
              alt={collection.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-bold">{collection.title}</h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

