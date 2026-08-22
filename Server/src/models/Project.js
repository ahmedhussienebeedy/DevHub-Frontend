import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    // Unique ID for this position
    id: {
      type: String,
      required: true,
    },

    // Example: Frontend Developer
    role: {
      type: String,
      required: true,
      trim: true,
    },

    // Junior / Mid / Senior
    level: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: true,
    },

    // AI estimated budget for this position
    salary: {
      type: Number,
      default: 0,
    },

    // Position status
    status: {
      type: String,
      enum: ["waiting", "assigned", "completed"],
      default: "waiting",
    },

    // Freelancer accepted for this position
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Freelancers who applied for this position
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    _id: false,
  }
);

const projectSchema = new mongoose.Schema(
  {
    // ===============================
    // Basic Project Information
    // ===============================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: Number,
      required: true,
      min: 0,
    },

    deadline: {
      type: Date,
      required: true,
    },

    // ===============================
    // Project Classification
    // ===============================

    category: {
      type: String,
      required: true,
      trim: true,
    },

    projectType: {
      type: String,
      required: true,
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // ===============================
    // AI Analysis
    // ===============================

    complexity: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Enterprise"],
    },

    duration: {
      type: Number,
      default: 0,
    },

    estimatedCost: {
      type: Number,
      default: 0,
    },

    matchScore: {
      type: Number,
      default: 0,
    },

    features: [
      {
        type: String,
      },
    ],

    // ===============================
    // AI Recommended Team
    // ===============================

    team: {
      type: [teamMemberSchema],
      default: [],
    },

    // ===============================
    // Project Owner
    // ===============================

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===============================
    // Legacy / Main Freelancer
    // ===============================
    // We can keep this for now.
    // Later the assigned freelancers will mainly
    // be stored inside team[].freelancer

    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ===============================
    // Project Status
    // ===============================

    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema);

export default Project;