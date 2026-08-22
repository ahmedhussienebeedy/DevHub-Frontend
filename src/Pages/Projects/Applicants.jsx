
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  User,
  Mail,
  DollarSign,
  Clock,
  FileText,
  Check,
  X,
  Users,
  BriefcaseBusiness,
  BadgeCheck,
} from "lucide-react";

export default function Applicants() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // ======================================
  // Fetch Applicants
  // ======================================

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      const { data } = await axios.get(
  `https://devhub-backend-production-113b.up.railway.app/api/applications/project/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setApplications(data.applications || []);
    } catch (error) {
      console.error(
        "Failed to fetch applicants:",
        error.response?.data || error.message
      );

      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // Accept / Reject
  // ======================================

  const updateStatus = async (applicationId, status) => {
    try {
      setProcessingId(applicationId);

      const token = localStorage.getItem("token");

     const { data } = await axios.patch(
  `https://devhub-backend-production-113b.up.railway.app/api/applications/${applicationId}/status`,
  {
    status,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (status === "accepted") {
        alert(data.message || "Application accepted successfully.");

        // Move to payment page
        navigate(`/payment/${id}`);
        return;
      }

      alert(data.message || "Application rejected.");

      await fetchApplicants();
    } catch (error) {
      console.error(
        "Failed to update application:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ======================================
  // Loading
  // ======================================

  if (loading) {
    return (
      <div className="relative min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 w-56 bg-white/5 rounded-lg animate-pulse mb-3" />
          <div className="h-5 w-96 max-w-full bg-white/5 rounded-lg animate-pulse mb-10" />

          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-96 rounded-3xl bg-white/5 border border-white/10 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ======================================
  // Render
  // ======================================

  return (
    <div className="relative min-h-screen bg-slate-950 text-white px-6 py-10 overflow-hidden">
      {/* Background Glow */}

      <div className="fixed top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="fixed bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* ======================================
            Header
        ====================================== */}

        <button
          type="button"
          onClick={() => navigate("/client")}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <p className="text-violet-400 font-semibold mb-2">
              Project Applications
            </p>

            <h1 className="text-4xl md:text-5xl font-black">
              Applicants
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Review freelancers and choose the best candidate for each
              position.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
            <Users size={22} className="text-violet-400" />

            <div>
              <p className="text-xs text-slate-500">
                Total Applications
              </p>

              <p className="text-xl font-bold">
                {applications.length}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================
            Empty State
        ====================================== */}

        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
              <Users
                size={38}
                className="text-violet-400"
              />
            </div>

            <h2 className="text-2xl font-bold mt-6">
              No Applicants Yet
            </h2>

            <p className="text-slate-400 mt-3 max-w-md mx-auto">
              Your project has not received any applications yet.
              Check back later for new freelancers.
            </p>
          </motion.div>
        ) : (
          /* ======================================
             Applications
          ====================================== */

          <div className="grid md:grid-cols-2 gap-6">
            {applications.map((app, index) => {
              const isProcessing =
                processingId === app._id;

              const isPending =
                app.status === "pending";

              return (
                <motion.div
                  key={app._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className={`bg-white/5 backdrop-blur-xl border rounded-3xl p-7 shadow-2xl transition-all ${
                    app.status === "accepted"
                      ? "border-green-500/30"
                      : app.status === "rejected"
                      ? "border-red-500/20"
                      : "border-white/10 hover:border-violet-500/40"
                  }`}
                >
                  {/* ======================================
                      Freelancer Header
                  ====================================== */}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center">
                        <User
                          size={25}
                          className="text-violet-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-xl font-bold truncate">
                          {app.freelancer?.name ||
                            "Unknown Freelancer"}
                        </h2>

                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                          <Mail size={14} />

                          <span className="truncate">
                            {app.freelancer?.email ||
                              "No email"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}

                    <span
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border ${
                        app.status === "accepted"
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : app.status === "rejected"
                          ? "bg-red-500/10 border-red-500/20 text-red-400"
                          : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  {/* ======================================
                      Position
                  ====================================== */}

                  <div className="mt-7 bg-slate-900/70 border border-white/5 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-violet-400">
                      <BriefcaseBusiness size={18} />

                      <span className="text-sm font-semibold">
                        Applied Position
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mt-2">
                      {app.positionRole ||
                        "Position"}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      Position ID:{" "}
                      {app.positionId || "N/A"}
                    </p>
                  </div>

                  {/* ======================================
                      Application Details
                  ====================================== */}

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <DetailCard
                      icon={
                        <BadgeCheck size={17} />
                      }
                      label="Experience"
                      value={
                        app.experienceLevel ||
                        "Not specified"
                      }
                    />

                    <DetailCard
                      icon={
                        <DollarSign size={17} />
                      }
                      label="Proposed Price"
                      value={`$${app.price ?? 0}`}
                    />

                    <DetailCard
                      icon={
                        <Clock size={17} />
                      }
                      label="Delivery"
                      value={`${app.deliveryTime || 0} Days`}
                    />

                    <DetailCard
                      icon={
                        <FileText size={17} />
                      }
                      label="Application"
                      value="Submitted"
                    />
                  </div>

                  {/* ======================================
                      Cover Letter
                  ====================================== */}

                  <div className="mt-5">
                    <div className="flex items-center gap-2 text-slate-300 mb-2">
                      <FileText size={17} />

                      <span className="font-semibold">
                        Cover Letter
                      </span>
                    </div>

                    <div className="bg-slate-900/70 border border-white/5 rounded-2xl p-5">
                      <p className="text-slate-400 leading-7 whitespace-pre-wrap">
                        {app.coverLetter ||
                          "No cover letter provided."}
                      </p>
                    </div>
                  </div>

                  {/* ======================================
                      Actions
                  ====================================== */}

                  {isPending && (
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() =>
                          updateStatus(
                            app._id,
                            "accepted"
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed px-5 py-3 rounded-xl font-semibold transition hover:-translate-y-1"
                      >
                        {isProcessing ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Check size={18} />
                        )}

                        {isProcessing
                          ? "Processing..."
                          : "Accept"}
                      </button>

                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() =>
                          updateStatus(
                            app._id,
                            "rejected"
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed px-5 py-3 rounded-xl font-semibold transition hover:-translate-y-1"
                      >
                        {isProcessing ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <X size={18} />
                        )}

                        {isProcessing
                          ? "Processing..."
                          : "Reject"}
                      </button>
                    </div>
                  )}

                  {app.status === "accepted" && (
                    <div className="mt-6 flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl py-3 font-semibold">
                      <Check size={18} />
                      Application Accepted
                    </div>
                  )}

                  {app.status === "rejected" && (
                    <div className="mt-6 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl py-3 font-semibold">
                      <X size={18} />
                      Application Rejected
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.main>
    </div>
  );
}

// ======================================
// Detail Card
// ======================================

function DetailCard({ icon, label, value }) {
  return (
    <div className="bg-slate-900/70 border border-white/5 rounded-xl p-4">
      <div className="flex items-center gap-2 text-slate-500 text-xs">
        {icon}
        <span>{label}</span>
      </div>

      <p className="text-white font-bold mt-2 truncate">
        {value}
      </p>
    </div>
  );
}

