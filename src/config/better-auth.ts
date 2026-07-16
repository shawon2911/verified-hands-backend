import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("verifiedhands");

const isProd = process.env.IS_PROD === "true";

export const auth = betterAuth({
  database: mongodbAdapter(db, { client: client }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BASE_URL || "http://localhost:5000",
  trustedOrigins: [
    process.env.FRONTEND_URL || "http://localhost:5173",
  ],
  advanced: {
    defaultCookieAttributes: isProd
      ? {
          sameSite: "none",
          secure: true,
        }
      : {
          sameSite: "lax",
          secure: false,
        },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "employer",
        input: true,
      },
    },
  },
});