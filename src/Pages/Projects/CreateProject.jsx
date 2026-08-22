import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import StepCategory from "../../Components/createProject/StepCategory";
import StepProjectType from "../../Components/createProject/StepProjectType";
import AIAnalysis from "../../Components/createProject/AIAnalysis";
import TeamBoard from "../../Components/createProject/TeamBoard";

export default function CreateProject() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  budget: "",
  deadline: "",
  category: "",
  projectType: "",

  skills: [],
  requirements: [],

  team: [],

  complexity: "",
  duration: 0,
  estimatedCost: 0,
  matchScore: 0,
});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  if (e) {
    e.preventDefault();
  }


    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:8000/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      navigate("/client");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 py-12 px-5">

      {/* ========================= */}
      {/* STEP 1 */}
      {/* ========================= */}

      {step === 1 && (
        <StepCategory
          formData={formData}
          setFormData={setFormData}
          next={() => setStep(2)}
        />
      )}

      {/* ========================= */}
      {/* STEP 2 */}
      {/* ========================= */}

      {step === 2 && (
        <StepProjectType
          formData={formData}
          setFormData={setFormData}
          back={() => setStep(1)}
          next={() => setStep(3)}
        />
      )}

      {/* ========================= */}
      {/* STEP 3 */}
      {/* ========================= */}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8"
        >
          <button
            onClick={() => setStep(2)}
            className="mb-8 text-violet-400 hover:text-violet-300"
          >
            ← Back
          </button>

          <div className="mb-8">

            <h1 className="text-4xl font-bold">
              Project Details
            </h1>

            <p className="text-slate-400 mt-2">
              Category :
              <span className="text-violet-400 ml-2">
                {formData.category}
              </span>
            </p>

            <p className="text-slate-400">
              Project Type :
              <span className="text-cyan-400 ml-2">
                {formData.projectType}
              </span>
            </p>

          </div>

         <form className="space-y-5">

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-800 rounded-xl p-3 text-white outline-none border border-slate-700 focus:border-violet-500"
            />

            <textarea
              rows="6"
              name="description"
              placeholder="Describe your project in detail..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-800 rounded-xl p-3 text-white outline-none border border-slate-700 focus:border-violet-500"
            />

            <input
              type="number"
              name="budget"
              placeholder="Project Budget ($)"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-slate-800 rounded-xl p-3 text-white outline-none border border-slate-700 focus:border-violet-500"
            />

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full bg-slate-800 rounded-xl p-3 text-white outline-none border border-slate-700 focus:border-violet-500"
            />

            <div className="flex gap-4">

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/2 border border-slate-700 py-3 rounded-xl hover:bg-slate-800 transition"
              >
                Back
              </button>

              <button
  type="button"
  onClick={() => setStep(4)}
  className="w-1/2 bg-violet-600 hover:bg-violet-700 rounded-xl py-3 font-semibold transition"
>
  Continue →
</button>

            </div>

          </form>
        </motion.div>
      )}

      {/* ========================= */}
{/* STEP 4 */}
{/* ========================= */}

{step === 4 && (
  <AIAnalysis
    formData={formData}
    setFormData={setFormData}
    back={() => setStep(3)}
    next={() => setStep(5)}
  />
)}

{/* ========================= */}
{/* STEP 5 */}
{/* ========================= */}

{step === 5 && (
  <TeamBoard
    formData={formData}
    back={() => setStep(4)}
    publish={handleSubmit}
    loading={loading}
  />
)}
    </section>
  );
}