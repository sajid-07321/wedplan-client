import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.MONGODB_URL as string)
const db = client.db("wedplan")

export const auth = betterAuth({
  //...

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["customer", "vendor", "admin"],
        required: true,
        // Required fields need a default so sign-ups that don't send the
        // field (e.g. Google OAuth) don't fail with MISSING_FIELD.
        defaultValue: "customer",
        input: true,
      },
      businessName: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
})
