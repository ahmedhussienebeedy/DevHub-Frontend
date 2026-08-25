import mongoose from "mongoose";

const paymentRecipientSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    // Project
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // Client
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Freelancer
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recipients: {
      type: [paymentRecipientSchema],
      default: [],
    },

    // Amount
    amount: {
      type: Number,
      required: true,
    },

    // Stripe Payment Intent ID
    stripePaymentIntentId: {
      type: String,
      default: "",
    },

    // Stripe Charge ID
    stripeChargeId: {
      type: String,
      default: "",
    },

    // Payment Status
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "released",
        "refunded",
      ],
      default: "pending",
    },

    // Payment Released At
    releasedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Payment =
  mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);

export default Payment;