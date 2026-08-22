import Stripe from "stripe";
import Payment from "../models/Payment.js";
import Project from "../models/Project.js";
import Notification from "../models/Notification.js";
import { sendNotification } from "../socket/socket.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ======================================
// Create Payment Intent
// ======================================
export const createPaymentIntent = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Only project owner can pay
    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Freelancer must be selected
    if (!project.freelancer) {
      return res.status(400).json({
        success: false,
        message: "No freelancer selected",
      });
    }

    // Prevent duplicate payments
    const existingPayment = await Payment.findOne({
      project: project._id,
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already exists",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(project.budget * 100),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        projectId: project._id.toString(),
        clientId: req.user.id,
        freelancerId: project.freelancer.toString(),
      },
    });

    const payment = await Payment.create({
      project: project._id,
      client: req.user.id,
      freelancer: project.freelancer,
      amount: project.budget,
      stripePaymentIntentId: paymentIntent.id,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      payment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Confirm Payment After Success
// ======================================
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "Payment Intent ID is required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        message: "Payment has not been completed yet",
      });
    }

    const payment = await Payment.findOne({
      stripePaymentIntentId: paymentIntentId,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Already confirmed
    if (payment.status === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already confirmed",
      });
    }

    // Update payment
    payment.status = "paid";

    if (paymentIntent.latest_charge) {
      payment.stripeChargeId = paymentIntent.latest_charge;
    }

    await payment.save();

    const project = await Project.findById(payment.project);

    const notification = await Notification.create({
      user: payment.freelancer,
      sender: payment.client,
      project: payment.project,
      type: "payment",
      title: "💰 Payment Received",
      body: `The client has completed payment for "${project.title}".`,
    });

    await notification.populate("sender", "name");
    await notification.populate("project", "title");

    console.log("📨 Sending payment notification...");
    console.log("Freelancer:", payment.freelancer.toString());

    sendNotification(payment.freelancer, notification);

    console.log("✅ Notification sent successfully");

    res.status(200).json({
      success: true,
      message: "Payment confirmed successfully",
      payment,
    });
  } catch (error) {
    console.error("❌ Confirm Payment Error");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};