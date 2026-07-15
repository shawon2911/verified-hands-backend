"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
const mongodb_1 = require("better-auth/adapters/mongodb");
const mongodb_2 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new mongodb_2.MongoClient(process.env.MONGODB_URI);
const db = client.db("verifiedhands");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, mongodb_1.mongodbAdapter)(db, {
        client: client,
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BASE_URL || "http://localhost:5000",
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
                input: true, // client theke signup-e pathano allow kore
            },
        },
    },
    socialProviders: {},
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
//# sourceMappingURL=better-auth.js.map