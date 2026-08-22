
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Send,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../../Context/AuthContext";
const API_URL =
  import.meta.env.VITE_API_URL || "https://devhub-backend-production-113b.up.railway.app/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    experienceLevel: "",
    coverLetter: "",
    price: "",
    deliveryTime: "",
  });

  // ======================================
  // Fetch Project
  // ======================================

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
  `${API_URL}/projects/${id}`
);
      setProject(data.project);
    } catch (error) {
      console.error(
        "Failed to fetch project:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // Select Position
  // ======================================

  const handleSelectPosition = (position) => {
    if (position.status === "assigned") {
      return;
    }

    setSelectedPosition(position);

    setFormData({
      experienceLevel: position.level || "",
      coverLetter: "",
      price: position.salary || "",
      deliveryTime: project?.duration || 14,
    });

    setShowApplyForm(true);
  };

  // ======================================
  // Form Change
  // ======================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================================
  // Apply
  // ======================================

  const handleApply = async (e) => {
    e.preventDefault();

    if (!selectedPosition) {
      return;
    }

    if (!formData.experienceLevel) {
      alert("Please select your experience level.");
      return;
    }

    if (!formData.coverLetter.trim()) {
      alert("Please write a cover letter.");
      return;
    }

    if (!formData.price) {
      alert("Please enter your price.");
      return;
    }

    if (!formData.deliveryTime) {
      alert("Please enter your delivery time.");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");
const { data } = await axios.post(
  `${API_URL}/applications/${project._id}`,
        {
          positionId: selectedPosition.id,
          positionRole: selectedPosition.role,
          experienceLevel: formData.experienceLevel,
          coverLetter: formData.coverLetter,
          price: Number(formData.price),
          deliveryTime: Number(formData.deliveryTime),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message || "Application submitted successfully.");

      setShowApplyForm(false);
      setSelectedPosition(null);

      setFormData({
        experienceLevel: "",
        coverLetter: "",
        price: "",
        deliveryTime: "",
      });

      navigate("/freelancer/applications");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to submit application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ======================================
  // Loading
  // ======================================

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto" />

          <p className="text-slate-400 mt-5">
            Loading project...
          </p>
        </div>
      </section>
    );
  }

  // ======================================
  // Not Found
  // ======================================

  if (!project) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Project Not Found
          </h1>

          <Link
            to="/freelancer"
            className="inline-flex items-center gap-2 mt-6 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl text-white font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </section>
    );
  }

  const positions = project.team || [];

  const availablePositions = positions.filter(
    (position) => position.status !== "assigned"
  );

  return (
    <section className="min-h-screen bg-slate-950 text-white py-10 px-5">

      <div className="max-w-6xl mx-auto">

        {/* ======================================
            Back
        ====================================== */}

        <Link
          to="/freelancer"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        {/* ======================================
            Project Header
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10"
        >

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

            <div className="flex-1">

              <div className="flex flex-wrap gap-2 mb-4">

                <span className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm">
                  {project.category}
                </span>

                {project.projectType && (
                  <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
                    {project.projectType}
                  </span>
                )}

                <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  {project.status}
                </span>

              </div>

              <h1 className="text-4xl md:text-5xl font-black">
                {project.title}
              </h1>

              <p className="text-slate-400 text-lg mt-5 leading-8">
                {project.description}
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-6 min-w-[220px]">

              <p className="text-slate-500 text-sm">
                Project Budget
              </p>

              <p className="text-3xl font-black text-green-400 mt-2">
                ${project.budget}
              </p>

              {project.estimatedCost > 0 && (
                <p className="text-sm text-slate-400 mt-2">
                  AI Estimate:{" "}
                  <span className="text-cyan-400">
                    ${project.estimatedCost}
                  </span>
                </p>
              )}

            </div>

          </div>

          {/* ======================================
              Project Info
          ====================================== */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

            <InfoCard
              icon={<BriefcaseBusiness size={18} />}
              label="Category"
              value={project.category}
            />

            <InfoCard
              icon={<Users size={18} />}
              label="Available Positions"
              value={availablePositions.length}
            />

            <InfoCard
              icon={<Clock3 size={18} />}
              label="Estimated Duration"
              value={
                project.duration
                  ? `${project.duration} Days`
                  : "Not specified"
              }
            />

            <InfoCard
              icon={<CalendarDays size={18} />}
              label="Deadline"
              value={
                project.deadline
                  ? new Date(
                      project.deadline
                    ).toLocaleDateString()
                  : "Not specified"
              }
            />

          </div>

          {/* ======================================
              Skills
          ====================================== */}

          {project.skills?.length > 0 && (

            <div className="mt-10">

              <h2 className="text-xl font-bold mb-4">
                Required Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {project.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-violet-600/10 border border-violet-500/20 text-violet-300 px-4 py-2 rounded-xl"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          )}

        </motion.div>

        {/* ======================================
            AI Team / Positions
        ====================================== */}

        <div className="mt-10">

          <div className="mb-6">

            <h2 className="text-3xl font-black">
              🤖 AI Recommended Positions
            </h2>

            <p className="text-slate-400 mt-2">
              Choose the position that matches your experience and apply
              directly to that role.
            </p>

          </div>

          {positions.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">

              <Users
                size={50}
                className="mx-auto text-slate-600"
              />

              <h3 className="text-xl font-bold mt-5">
                No Positions Available
              </h3>

              <p className="text-slate-400 mt-2">
                This project does not have AI recommended positions yet.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {positions.map((position, index) => {

                const isAssigned =
                  position.status === "assigned";

                const isSelected =
                  selectedPosition?.id === position.id;

                return (

                  <motion.div
                    key={position.id || index}
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
                    className={`bg-slate-900 border rounded-3xl p-7 transition ${
                      isSelected
                        ? "border-violet-500 shadow-lg shadow-violet-500/10"
                        : "border-slate-800 hover:border-violet-500/40"
                    }`}
                  >

                    {/* Position Header */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center">
                          <BriefcaseBusiness
                            className="text-violet-400"
                            size={22}
                          />
                        </div>

                        <div>

                          <h3 className="text-xl font-bold">
                            {position.role}
                          </h3>

                          <p className="text-slate-500 mt-1">
                            Position ID: {position.id}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`text-xs px-3 py-1.5 rounded-full border ${
                          isAssigned
                            ? "bg-red-500/10 border-red-500/20 text-red-400"
                            : "bg-green-500/10 border-green-500/20 text-green-400"
                        }`}
                      >
                        {isAssigned
                          ? "Assigned"
                          : "Available"}
                      </span>

                    </div>

                    {/* Position Details */}

                    <div className="grid grid-cols-2 gap-4 mt-7">

                      <div className="bg-slate-800/70 rounded-xl p-4">

                        <p className="text-xs text-slate-500">
                          Required Level
                        </p>

                        <p className="font-bold text-violet-400 mt-1">
                          {position.level}
                        </p>

                      </div>

                      <div className="bg-slate-800/70 rounded-xl p-4">

                        <p className="text-xs text-slate-500">
                          Estimated Salary
                        </p>

                        <p className="font-bold text-green-400 mt-1">
                          ${position.salary || 0}
                        </p>

                      </div>

                    </div>

                    {/* Applicants */}

                    <div className="flex items-center gap-2 text-sm text-slate-400 mt-5">

                      <Users size={16} />

                      {position.applicants?.length || 0} applicants

                    </div>

                    {/* Apply Button */}

                    <button
                      disabled={isAssigned}
                      onClick={() =>
                        handleSelectPosition(position)
                      }
                      className={`mt-6 w-full py-3.5 rounded-xl font-semibold transition ${
                        isAssigned
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                          : "bg-violet-600 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/20"
                      }`}
                    >
                      {isAssigned
                        ? "Position Already Assigned"
                        : "Apply for this Position →"}
                    </button>

                  </motion.div>

                );
              })}

            </div>

          )}

        </div>

        {/* ======================================
            Apply Form
        ====================================== */}

        {showApplyForm && selectedPosition && (

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-10"
          >

            <div className="bg-slate-900 border border-violet-500/30 rounded-3xl p-8 md:p-10">

              <div className="flex items-start justify-between gap-5 mb-8">

                <div>

                  <p className="text-violet-400 text-sm font-semibold">
                    Applying For
                  </p>

                  <h2 className="text-3xl font-black mt-1">
                    {selectedPosition.role}
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Required level:{" "}
                    <span className="text-violet-400">
                      {selectedPosition.level}
                    </span>
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowApplyForm(false);
                    setSelectedPosition(null);
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                >
                  <X size={20} />
                </button>

              </div>

              <form
                onSubmit={handleApply}
                className="space-y-6"
              >

                {/* Experience */}

                <div>

                  <label className="block text-sm text-slate-400 mb-2">
                    Your Experience Level
                  </label>

                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500"
                  >

                    <option value="">
                      Select your experience
                    </option>

                    <option value="Junior">
                      Junior
                    </option>

                    <option value="Mid">
                      Mid
                    </option>

                    <option value="Senior">
                      Senior
                    </option>

                  </select>

                </div>

                {/* Cover Letter */}

                <div>

                  <label className="block text-sm text-slate-400 mb-2">
                    Cover Letter
                  </label>

                  <textarea
                    name="coverLetter"
                    rows="6"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell the client why you are the right person for this position..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-violet-500 resize-none"
                  />

                </div>

                {/* Price + Delivery */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm text-slate-400 mb-2">
                      Your Price ($)
                    </label>

                    <div className="relative">

                      <DollarSign
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        type="number"
                        min="0"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-violet-500"
                      />

                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      AI estimated salary: ${selectedPosition.salary || 0}
                    </p>

                  </div>

                  <div>

                    <label className="block text-sm text-slate-400 mb-2">
                      Delivery Time (Days)
                    </label>

                    <div className="relative">

                      <Clock3
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        type="number"
                        min="1"
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-violet-500"
                      />

                    </div>

                  </div>

                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900 disabled:cursor-not-allowed py-4 rounded-xl font-bold text-lg transition"
                >

                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Application...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Application
                    </>
                  )}

                </button>

              </form>

            </div>

          </motion.div>

        )}

        {/* ======================================
            Chat
        ====================================== */}

        {user && (

          <div className="mt-8 text-center">

            <Link
              to={`/project/${project._id}/chat`}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              Chat with Client 💬
            </Link>

          </div>

        )}

      </div>

    </section>
  );
}

// ======================================
// Info Card
// ======================================

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

      <div className="flex items-center gap-2 text-slate-500 text-sm">
        {icon}
        {label}
      </div>

      <p className="text-white font-bold mt-2">
        {value}
      </p>

    </div>
  );
}
