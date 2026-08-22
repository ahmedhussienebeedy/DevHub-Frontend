import express from "express";

import protect from "../middleware/protect.js";

import {
  createPaymentIntent,
  confirmPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// ======================================
// Create Payment Intent
// ======================================
router.post(
  "/create-payment-intent",
  protect,
  createPaymentIntent
);

// ======================================
// Confirm Payment After Stripe Success
// ======================================
router.post(
  "/confirm-payment",
  protect,
  confirmPayment
);

export default router;