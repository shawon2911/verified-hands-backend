const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trade: { type: String, required: true },
  bio: { type: String },
  fullDescription: { type: String },
  rate: { type: Number, required: true },
  rateType: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: Number, required: true },
  skills: { type: [String], default: [] },
  availability: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  imageUrl: { type: String },
  verified: { type: Boolean, default: false },
 
}, { timestamps: true });

module.exports = mongoose.model("worker", workerSchema);