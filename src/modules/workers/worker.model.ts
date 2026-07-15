import mongoose, { Schema, Document } from "mongoose";

export interface IWorker extends Document {
  name: string;
  trade: string;
  bio: string;
  fullDescription: string;
  rate: number;
  rateType: string;
  location: string;
  experience: number;
  skills: string[];
  availability: string[];
  rating: number;
  totalReviews: number;
  imageUrl: string;
  verified: boolean;
  userId: string;
}

const WorkerSchema = new Schema<IWorker>(
  {
    name: { type: String, required: true },
    trade: { type: String, required: true },
    bio: { type: String, required: true },
    fullDescription: { type: String, required: true },
    rate: { type: Number, required: true },
    rateType: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    skills: { type: [String], required: true },
    availability: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    imageUrl: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Worker = mongoose.model<IWorker>("Worker", WorkerSchema);