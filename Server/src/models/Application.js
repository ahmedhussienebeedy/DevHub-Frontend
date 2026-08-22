import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // ===============================
    // Project
    // ===============================
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // ===============================
    // Freelancer
    // ===============================
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===============================
    // Position
    // ===============================
    positionId: {
      type: String,
      required: true,
      trim: true,
    },

    positionRole: {
      type: String,
      required: true,
      trim: true,
    },

    // ===============================
    // Freelancer Experience
    // ===============================
    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: true,
    },

    // ===============================
    // Application Details
    // ===============================
    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryTime: {
      type: Number,
      required: true,
      min: 1,
    },

    // ===============================
    // Application Status
    // ===============================
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent same freelancer from applying twice
// to the same position in the same project
applicationSchema.index(
  {
    project: 1,
    freelancer: 1,
    positionId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Application", applicationSchema);