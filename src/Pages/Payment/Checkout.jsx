import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  const { id } = useParams();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const getClientSecret = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:8000/api/payments/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              projectId: id,
            }),
          }
        );

        const data = await res.json();

        console.log("========== PAYMENT RESPONSE ==========");
        console.log(data);
        console.log("clientSecret:", data.clientSecret);
        console.log("======================================");

        if (!mounted) return;

        if (
          data.success &&
          data.clientSecret &&
          data.clientSecret.includes("_secret_")
        ) {
          setClientSecret(data.clientSecret);
        } else {
          setError(
            data.message ||
              "Invalid client secret returned from server."
          );
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getClientSecret();

    return () => {
      mounted = false;
    };
  }, [id]);

  console.log("STATE clientSecret =>", clientSecret);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading Payment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-6 rounded-xl max-w-xl">
          <h2 className="font-bold text-xl mb-2">
            Payment Error
          </h2>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!clientSecret || !clientSecret.includes("_secret_")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        Invalid Client Secret
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Complete Payment
        </h1>

        <p className="text-slate-400 mb-8">
          Secure payment powered by Stripe.
        </p>

        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}