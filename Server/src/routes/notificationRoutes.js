import express from "express";

import {
  getMyNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

import protect from "../middleware/protect.js";

const router = express.Router();

// Get My Notifications
router.get("/", protect, getMyNotifications);

// Mark As Read
router.patch("/:id/read", protect, markAsRead);

// Delete Notification
router.delete("/:id", protect, deleteNotification);

export default router;