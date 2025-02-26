import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema(
  {
    storeName: String,
    storeEmail: String,
    storePhone: String,
    storeAddress: String,
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    customerReviews: {
      type: Boolean,
      default: true,
    },
    inventoryNotifications: {
      type: Boolean,
      default: true,
    },
    notifications: {
      orderConfirmations: {
        type: Boolean,
        default: true,
      },
      shippingUpdates: {
        type: Boolean,
        default: true,
      },
      customerMessages: {
        type: Boolean,
        default: true,
      },
      reviewNotifications: {
        type: Boolean,
        default: true,
      },
    },
    shipping: {
      defaultMethod: {
        type: String,
        default: "standard",
      },
      freeShippingThreshold: {
        type: Number,
        default: 100,
      },
      methods: [
        {
          name: String,
          price: Number,
          estimatedDays: String,
        },
      ],
    },
    payments: {
      stripe: {
        enabled: {
          type: Boolean,
          default: true,
        },
        testMode: {
          type: Boolean,
          default: true,
        },
        livePublicKey: String,
        liveSecretKey: String,
        testPublicKey: String,
        testSecretKey: String,
      },
      paypal: {
        enabled: {
          type: Boolean,
          default: true,
        },
        testMode: {
          type: Boolean,
          default: true,
        },
        liveClientId: String,
        liveSecretKey: String,
        testClientId: String,
        testSecretKey: String,
      },
      paystack: {
        enabled: {
          type: Boolean,
          default: false,
        },
        testMode: {
          type: Boolean,
          default: true,
        },
        livePublicKey: String,
        liveSecretKey: String,
        testPublicKey: String,
        testSecretKey: String,
      },
      creditCard: {
        type: Boolean,
        default: true,
      },
      applePay: {
        type: Boolean,
        default: false,
      },
      googlePay: {
        type: Boolean,
        default: false,
      },
      currency: {
        type: String,
        default: "usd",
      },
    },
    localization: {
      defaultLanguage: {
        type: String,
        default: "en",
      },
      defaultCurrency: {
        type: String,
        default: "USD",
      },
      supportedLanguages: [
        {
          code: String,
          name: String,
          enabled: {
            type: Boolean,
            default: true,
          },
        },
      ],
      supportedCurrencies: [
        {
          code: String,
          symbol: String,
          enabled: {
            type: Boolean,
            default: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Settings || mongoose.model("Settings", settingsSchema)

