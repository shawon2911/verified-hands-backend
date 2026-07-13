import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BASE_URL || "http://localhost:5000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, 
  },
  socialProviders: {
   
  },
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
});


// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// // Mongoose-এর ডিফল্ট ড্রাইভার কানেকশন রেফারেন্স ব্যবহার করা নিরাপদ
// export const getAuth = () => {
//   const db = mongoose.connection.db;
//   if (!db) {
//     throw new Error("Database not connected yet!");
//   }

//   return betterAuth({
//     database: mongodbAdapter(db),
//     secret: process.env.BETTER_AUTH_SECRET!,
//     baseURL: process.env.BASE_URL || "http://localhost:5000",
//     emailAndPassword: {
//       enabled: true,
//       autoSignIn: true,
//     },
//     trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
//   });
// };