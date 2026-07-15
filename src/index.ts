import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/better-auth";
import dns from "dns";
import workerRoutes from "./modules/workers/worker.routes";
import jobRoutes from "./modules/jobs/job.routes";

// ✅ ১. DNS ও Environment Variables একদম শুরুতে
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

// ✅ ২. CORS মিডলওয়্যার - Better Auth এর আগে
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "https://verified-hands-client.vercel.app" // Vercel URL যোগ করুন
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ ৩. JSON মিডলওয়্যার - Better Auth এর আগে
app.use(express.json());

// ✅ ৪. Better Auth - CORS এর পরে
app.use("/api/auth", toNodeHandler(auth));

// ✅ ৫. MongoDB Connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// ✅ ৬. Routes
app.use("/api/workers", workerRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (_req, res) => {
  res.send("VerifiedHands API is running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});














































// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import { toNodeHandler } from "better-auth/node";
// import { auth } from "./config/better-auth";
// import dns from "dns";
// import workerRoutes from "./modules/workers/worker.routes"
// import jobRoutes from "./modules/jobs/job.routes";

// dns.setDefaultResultOrder("ipv4first");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;




// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   credentials: true,
// }));
// app.use("/api/auth", toNodeHandler(auth));
// app.use(express.json());



// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI!)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));


//   app.use("/api/workers", workerRoutes);

//   app.use("/api/jobs", jobRoutes);


// app.get("/", (_req, res) => {
//   res.send("VerifiedHands API is running");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });