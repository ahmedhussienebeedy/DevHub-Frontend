import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Confirming payment...");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const paymentIntentId =
          searchParams.get("payment_intent");

        if (!paymentIntentId) {
          setMessage("Payment verification failed.");
          return;
        }

        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:8000/api/payments/confirm-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              paymentIntentId,
            }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setMessage("✅ Payment Successful");

          setTimeout(() => {
            navigate("/client");
          }, 2500);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.log(err);
        setMessage("Something went wrong.");
      }
    };

    confirmPayment();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center w-[500px]">
        <div className="text-6xl mb-5">
          💳
        </div>

        <h1 className="text-3xl text-white font-bold">
          {message}
        </h1>

        <p className="text-slate-400 mt-5">
          Please wait...
        </p>
      </div>
    </div>
  );
}