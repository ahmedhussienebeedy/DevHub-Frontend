import mongoose from "mongoose";

const assessmentQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String,
      },
    ],

    answer: {
      type: Number,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    points: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "AssessmentQuestion",
  assessmentQuestionSchema
);