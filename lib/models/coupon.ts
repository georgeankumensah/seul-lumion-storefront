import mongoose from "mongoose"

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    minPurchase: {
      type: Number,
      default: 0,
    },
    maxDiscount: {
      type: Number, // Only applicable for percentage discounts
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    usageLimit: {
      type: Number, // Total number of times this coupon can be used
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    perUserLimit: {
      type: Number, // Number of times a single user can use this coupon
      default: 1,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    description: String,
  },
  {
    timestamps: true,
  },
)

// Method to check if coupon is valid
couponSchema.methods.isValid = function () {
  const now = new Date()

  if (!this.isActive) return false

  if (this.usageLimit && this.usageCount >= this.usageLimit) return false

  if (this.startDate && this.startDate > now) return false

  if (this.endDate && this.endDate < now) return false

  return true
}

// Method to calculate discount
couponSchema.methods.calculateDiscount = function (subtotal: number) {
  if (!this.isValid()) return 0

  if (subtotal < this.minPurchase) return 0

  let discount = 0

  if (this.type === "percentage") {
    discount = (subtotal * this.value) / 100
    if (this.maxDiscount) {
      discount = Math.min(discount, this.maxDiscount)
    }
  } else {
    discount = this.value
  }

  return Math.min(discount, subtotal) // Discount cannot exceed subtotal
}

export default mongoose.models.Coupon || mongoose.model("Coupon", couponSchema)

