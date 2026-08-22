import express from "express";

import {
  getCategories,
  getSpecializations,
  getQuestions,
  submitAssessment,
  getMyResult,
} from "../controllers/assessmentController.js";

import protect from "../middleware/protect.js";

const router = express.Router();

// Public Routes
router.get("/categories", getCategories);
router.get("/specializations/:category", getSpecializations);

// Protected Routes
router.get("/questions", protect, getQuestions);
router.post("/submit", protect, submitAssessment);
router.get("/result", protect, getMyResult);

export default router;