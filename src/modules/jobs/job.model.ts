import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  trade: string;
  budget: number;
  preferredDate: string;
  location: string;
  address: string;
  employerId: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  workerId?: string;
  createdAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    trade: { type: String, required: true },
    budget: { type: Number, required: true },
    preferredDate: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    employerId: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "cancelled"],
      default: "open",
    },
    workerId: { type: String },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", JobSchema);