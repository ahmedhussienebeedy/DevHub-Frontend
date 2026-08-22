import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Briefcase,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL =
  import.meta.env.VITE_API_URL || "https://devhub-backend-production-113b.up.railway.app/api";
export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRole = (selectedRole) => {
    setRole(selectedRole);

    setFormData({
      ...formData,
      role: selectedRole,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

    const { data } = await axios.post(
  `${API_URL}/auth/register`,
  formData
);
      alert(data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-12">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl"
      >

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-5xl font-black text-white">
            Join
            <span className="text-violet-500">
              {" "}DevHub
            </span>
          </h1>

          <p className="text-slate-400 mt-4 leading-7">
            Join DevHub to build projects or become part of AI-generated teams
            that perfectly match every client's budget and requirements.
          </p>

          {/* Role */}

          <div className="grid grid-cols-2 gap-4 mt-8">

            <button
              type="button"
              onClick={() => handleRole("client")}
              className={`rounded-xl py-3 font-semibold transition ${
                role === "client"
                  ? "bg-violet-600 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Client
            </button>

            <button
              type="button"
              onClick={() => handleRole("freelancer")}
              className={`rounded-xl py-3 font-semibold transition ${
                role === "freelancer"
                  ? "bg-violet-600 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Freelancer
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-8"
          >

            {/* Name */}

            <div className="relative">

              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full bg-slate-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none border border-slate-700 focus:border-violet-500"
              />

            </div>

            {/* Email */}

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full bg-slate-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none border border-slate-700 focus:border-violet-500"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-slate-800 rounded-xl py-3 pl-12 pr-12 text-white outline-none border border-slate-700 focus:border-violet-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Freelancer Info */}

            {role === "freelancer" && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: .4,
                }}
                className="bg-gradient-to-r from-violet-600/10 to-cyan-500/10 border border-violet-500/20 rounded-2xl p-5"
              >

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center">

                    <Briefcase
                      size={22}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      AI Freelancer Onboarding
                    </h3>

                    <p className="text-slate-400 mt-2 leading-7">
                      After creating your account, you'll complete
                      your professional profile and take a quick AI
                      skills assessment. DevHub will automatically
                      determine your experience level and recommend
                      projects that fit your skills and budget.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-5">

                      <div className="bg-slate-800 rounded-xl p-3 text-sm">
                        🎯 Choose Category
                      </div>

                      <div className="bg-slate-800 rounded-xl p-3 text-sm">
                        🧠 AI Skill Quiz
                      </div>

                      <div className="bg-slate-800 rounded-xl p-3 text-sm">
                        ⭐ AI Level Detection
                      </div>

                      <div className="bg-slate-800 rounded-xl p-3 text-sm">
                        🚀 Receive Projects
                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>

            )}

            {/* Submit */}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: .97,
              }}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </motion.button>

          </form>

          <p className="text-center text-slate-400 mt-8">

            Already have an account?

            <Link
              to="/login"
              className="text-violet-400 ml-2 hover:text-violet-300"
            >
              Login
            </Link>

          </p>

        </div>

      </motion.div>

    </section>
  );
}