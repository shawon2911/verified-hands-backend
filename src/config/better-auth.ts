import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("verifiedhands");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BASE_URL || "http://localhost:5000",
  trustedOrigins: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "https://verifiedhand.vercel.app" 
     
  ],
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