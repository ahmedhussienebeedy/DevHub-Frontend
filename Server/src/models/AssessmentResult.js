import mongoose from "mongoose";

const assessmentResultSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: String,

    specialization: String,

    score: Number,

    totalQuestions: Number,

    correctAnswers: Number,

    percentage: Number,

    level: {
      type: String,
      enum: [
        "Junior",
        "Mid-Level",
        "Senior",
        "Expert",
      ],
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
  "AssessmentResult",
  assessmentResultSchema
);