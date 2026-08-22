import mongoose from "mongoose";

const freelancerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },

    category: String,

    specialization: String,

    experienceYears: Number,

    hourlyRate: Number,

    portfolio: String,

    availability: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Weekends",
      ],
    },

    level: {
      type: String,
      default: "Junior",
    },

    aiScore: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "FreelancerProfile",
  freelancerProfileSchema
);