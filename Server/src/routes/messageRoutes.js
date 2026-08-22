import express from "express";

import protect from "../middleware/protect.js";

import {
  sendMessage,
  getConversation,
} from "../controllers/messageController.js";

const router = express.Router();

// Send Message
router.post("/", protect, sendMessage);

// Get Conversation
router.get("/:projectId", protect, getConversation);

export default router;