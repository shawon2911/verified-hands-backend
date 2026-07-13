import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/better-auth";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const Worker = require("./models/worker.js")
const dummyWorkers = [
  {
    name: "Kamal Hossain",
    trade: "Plumber",
    bio: "4 years experience in professional plumber services. NID verified.",
    fullDescription:
      "Specialized in high quality pipe fitting and leak repair.",
    rate: 400,
    rateType: "visit",
    location: "Gulshan, Dhaka",
    experience: 4,
    skills: ["Pipe Fitting", "Leak Repair", "Sanitary Installation"],
    availability: ["Sat-Thu", "9AM-8PM"],
    rating: 4.5,
    totalReviews: 30,
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    verified: true,
    
  },
  {
    name: "Abdur Rahman",
    trade: "Carpenter",
    bio: "7 years experience in professional carpenter services. NID verified.",
    fullDescription:
      "Specialized in high quality furniture making and door fitting.",
    rate: 450,
    rateType: "hour",
    location: "Banani, Dhaka",
    experience: 7,
    skills: ["Furniture Making", "Door Fitting", "Wood Polish"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.6,
    totalReviews: 38,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    verified: true,
    
  },
  {
    name: "MD. Asaduzzaman",
    trade: "Painter",
    bio: "10 years experience in professional painter services. NID verified.",
    fullDescription:
      "Specialized in high quality wall painting and wall putty.",
    rate: 500,
    rateType: "visit",
    location: "Dhanmondi, Dhaka",
    experience: 10,
    skills: ["Wall Painting", "Wall Putty", "Interior Design Painting"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.7,
    totalReviews: 46,
    imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    verified: true,
    
  },
  {
    name: "Rubel Miah",
    trade: "AC Technician",
    bio: "4 years experience in professional ac technician services. NID verified.",
    fullDescription: "Specialized in high quality ac servicing and gas refill.",
    rate: 550,
    rateType: "hour",
    location: "Uttara, Dhaka",
    experience: 4,
    skills: ["AC Servicing", "Gas Refill", "AC Installation"],
    availability: ["Sat-Thu", "9AM-8PM"],
    rating: 4.8,
    totalReviews: 54,
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    verified: true,
    
  },
  {
    name: "Sujon Ahmed",
    trade: "Appliance Repairer",
    bio: "7 years experience in professional appliance repairer services. NID verified.",
    fullDescription:
      "Specialized in high quality washing machine repair and refrigerator repair.",
    rate: 600,
    rateType: "visit",
    location: "Mohammadpur, Dhaka",
    experience: 7,
    skills: ["Washing Machine Repair", "Refrigerator Repair", "Oven Repair"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.9,
    totalReviews: 62,
    imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    verified: true,
    
  },
  {
    name: "Arifur Rahman",
    trade: "Plumber",
    bio: "10 years experience in professional plumber services. NID verified.",
    fullDescription:
      "Specialized in high quality pipe fitting and leak repair.",
    rate: 650,
    rateType: "hour",
    location: "Bashundhara, Dhaka",
    experience: 10,
    skills: ["Pipe Fitting", "Leak Repair", "Sanitary Installation"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.5,
    totalReviews: 70,
    imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    verified: true,
    
  },
  {
    name: "Siddiqur Rahman",
    trade: "Carpenter",
    bio: "4 years experience in professional carpenter services. NID verified.",
    fullDescription:
      "Specialized in high quality furniture making and door fitting.",
    rate: 700,
    rateType: "visit",
    location: "Gulshan, Dhaka",
    experience: 4,
    skills: ["Furniture Making", "Door Fitting", "Wood Polish"],
    availability: ["Sat-Thu", "9AM-8PM"],
    rating: 4.6,
    totalReviews: 78,
    imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    verified: true,
    
  },
  {
    name: "Anisur Rahman",
    trade: "Painter",
    bio: "7 years experience in professional painter services. NID verified.",
    fullDescription:
      "Specialized in high quality wall painting and wall putty.",
    rate: 750,
    rateType: "hour",
    location: "Banani, Dhaka",
    experience: 7,
    skills: ["Wall Painting", "Wall Putty", "Interior Design Painting"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.7,
    totalReviews: 86,
    imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
    verified: true,
  }, 
  {
    name: "Biplob Hossain",
    trade: "AC Technician",
    bio: "10 years experience in professional ac technician services. NID verified.",
    fullDescription: "Specialized in high quality ac servicing and gas refill.",
    rate: 800,
    rateType: "visit",
    location: "Dhanmondi, Dhaka",
    experience: 10,
    skills: ["AC Servicing", "Gas Refill", "AC Installation"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.8,
    totalReviews: 94,
    imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    verified: true,
    
  },
  {
    name: "MD. Selim",
    trade: "Appliance Repairer",
    bio: "4 years experience in professional appliance repairer services. NID verified.",
    fullDescription:
      "Specialized in high quality washing machine repair and refrigerator repair.",
    rate: 850,
    rateType: "hour",
    location: "Uttara, Dhaka",
    experience: 4,
    skills: ["Washing Machine Repair", "Refrigerator Repair", "Oven Repair"],
    availability: ["Sat-Thu", "9AM-8PM"],
    rating: 4.9,
    totalReviews: 102,
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    verified: true,
    
  },
  {
    name: "Tariqul Islam",
    trade: "Plumber",
    bio: "7 years experience in professional plumber services. NID verified.",
    fullDescription:
      "Specialized in high quality pipe fitting and leak repair.",
    rate: 400,
    rateType: "visit",
    location: "Mohammadpur, Dhaka",
    experience: 7,
    skills: ["Pipe Fitting", "Leak Repair", "Sanitary Installation"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.5,
    totalReviews: 110,
    imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    verified: true,
    
  },
  {
    name: "Rashedul Islam",
    trade: "Carpenter",
    bio: "10 years experience in professional carpenter services. NID verified.",
    fullDescription:
      "Specialized in high quality furniture making and door fitting.",
    rate: 450,
    rateType: "hour",
    location: "Bashundhara, Dhaka",
    experience: 10,
    skills: ["Furniture Making", "Door Fitting", "Wood Polish"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.6,
    totalReviews: 118,
    imageUrl: "https://randomuser.me/api/portraits/men/13.jpg",
    verified: true,
    
  },
  {
    name: "Faruk Hossain",
    trade: "Painter",
    bio: "4 years experience in professional painter services. NID verified.",
    fullDescription:
      "Specialized in high quality wall painting and wall putty.",
    rate: 500,
    rateType: "visit",
    location: "Gulshan, Dhaka",
    experience: 4,
    skills: ["Wall Painting", "Wall Putty", "Interior Design Painting"],
    availability: ["Sat-Thu", "9AM-8PM"],
    rating: 4.7,
    totalReviews: 126,
    imageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
    verified: true,
    
  },
  {
    name: "Zahid Hasan",
    trade: "AC Technician",
    bio: "7 years experience in professional ac technician services. NID verified.",
    fullDescription: "Specialized in high quality ac servicing and gas refill.",
    rate: 550,
    rateType: "hour",
    location: "Banani, Dhaka",
    experience: 7,
    skills: ["AC Servicing", "Gas Refill", "AC Installation"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.8,
    totalReviews: 134,
    imageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
    verified: true,
    
  },
  {
    name: "Mizanur Rahman",
    trade: "Appliance Repairer",
    bio: "10 years experience in professional appliance repairer services. NID verified.",
    fullDescription:
      "Specialized in high quality washing machine repair and refrigerator repair.",
    rate: 600,
    rateType: "visit",
    location: "Dhanmondi, Dhaka",
    experience: 10,
    skills: ["Washing Machine Repair", "Refrigerator Repair", "Oven Repair"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.9,
    totalReviews: 142,
    imageUrl: "https://randomuser.me/api/portraits/men/16.jpg",
    verified: true,
    
  },
  {
    name: "Shorif Ahmed",
    trade: "Plumber",
    bio: "4 years experience in professional plumber services. NID verified.",
    fullDescription:
      "Specialized in high quality pipe fitting and leak repair.",
    rate: 650,
    rateType: "hour",
    location: "Uttara, Dhaka",
    experience: 4,
    skills: ["Pipe Fitting", "Leak Repair", "Sanitary Installation"],
    availability: ["Sat-Thu", "9AM-8PM"],
    rating: 4.5,
    totalReviews: 150,
    imageUrl: "https://randomuser.me/api/portraits/men/17.jpg",
    verified: true,
    
  },
  {
    name: "Mahbub Alam",
    trade: "Carpenter",
    bio: "7 years experience in professional carpenter services. NID verified.",
    fullDescription:
      "Specialized in high quality furniture making and door fitting.",
    rate: 700,
    rateType: "visit",
    location: "Mohammadpur, Dhaka",
    experience: 7,
    skills: ["Furniture Making", "Door Fitting", "Wood Polish"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.6,
    totalReviews: 158,
    imageUrl: "https://randomuser.me/api/portraits/men/18.jpg",
    verified: true,
    
  },
  {
    name: "Al-Amin Hossain",
    trade: "Painter",
    bio: "10 years experience in professional painter services. NID verified.",
    fullDescription:
      "Specialized in high quality wall painting and wall putty.",
    rate: 750,
    rateType: "hour",
    location: "Bashundhara, Dhaka",
    experience: 10,
    skills: ["Wall Painting", "Wall Putty", "Interior Design Painting"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.7,
    totalReviews: 166,
    imageUrl: "https://randomuser.me/api/portraits/men/19.jpg",
    verified: true,
    
  },
  {
    name: "Monirul Islam",
    trade: "AC Technician",
    bio: "4 years experience in professional ac technician services. NID verified.",
    fullDescription: "Specialized in high quality ac servicing and gas refill.",
    rate: 800,
    rateType: "visit",
    location: "Gulshan, Dhaka",
    experience: 4,
    skills: ["AC Servicing", "Gas Refill", "AC Installation"],
    availability: ["Sat-Thu", "9AM-8PM"],
    rating: 4.8,
    totalReviews: 174,
    imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
    verified: true,
   
  },
  {
    name: "Nasir Uddin",
    trade: "Appliance Repairer",
    bio: "7 years experience in professional appliance repairer services. NID verified.",
    fullDescription:
      "Specialized in high quality washing machine repair and refrigerator repair.",
    rate: 850,
    rateType: "hour",
    location: "Banani, Dhaka",
    experience: 7,
    skills: ["Washing Machine Repair", "Refrigerator Repair", "Oven Repair"],
    availability: ["Everyday", "9AM-8PM"],
    rating: 4.9,
    totalReviews: 182,
    imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
    verified: true,
   
  },
];


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use("/api/auth", toNodeHandler(auth));
app.use(express.json());



// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  // ডেটা সিড বা পুশ করার জন্য GET রাউট
import { Request, Response } from "express";

// ডেটা সিড বা পুশ করার জন্য GET রাউট
app.get("/api/seed-workers", async (_req: Request, res: Response): Promise<void> => {
  try {
    // প্রতিবার হিট করলে যেন আগের ডেটা ডুপ্লিকেট না হয়, তাই আগেরগুলো ডিলিট করে নেওয়া সেফ
    await Worker.deleteMany({ userId: { $regex: /^demo_worker_/ } });

    // একসাথে ২০টি ডেটা ডাটাবেজে ইনসার্ট
    const result = await Worker.insertMany(dummyWorkers);

    res.status(201).json({
      success: true,
      message: `${result.length}টি ডেমো ওয়ার্কার ডেটা Atlas-এ সফলভাবে ইনসার্ট হয়েছে!`,
    });
  } catch (error) {
    // TypeScript-এর unknown টাইপ এরর দূর করতে Assertion ব্যবহার করা হয়েছে
    const err = error as Error;
    
    res.status(500).json({
      success: false,
      message: "ইনসার্ট করার সময় ইন্টারনাল এরর হয়েছে।",
      error: err.message
    });
  }
});



app.get("/", (_req, res) => {
  res.send("VerifiedHands API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});