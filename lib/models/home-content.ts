import mongoose from "mongoose"

const homeContentSchema = new mongoose.Schema(
  {
    hero: {
      image: String,
      title: String,
      subtitle: String,
      buttonText: String,
      buttonLink: String,
    },
    featuredCollections: [
      {
        image: String,
        title: String,
        link: String,
        order: Number,
      },
    ],
    gallery: [
      {
        image: String,
        title: String,
        subtitle: String,
        link: String,
        order: Number,
      },
    ],
    promotionalBanners: [
      {
        image: String,
        title: String,
        subtitle: String,
        buttonText: String,
        buttonLink: String,
        order: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.HomeContent || mongoose.model("HomeContent", homeContentSchema)

