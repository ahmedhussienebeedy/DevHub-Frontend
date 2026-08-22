import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "../../assets/videos/dashboard.mp4";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background Video */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-slate-950/80" />

      {/* Glow */}

      <div className="absolute top-20 left-20 w-[420px] h-[420px] bg-violet-600/25 blur-[160px] rounded-full" />

      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/20 blur-[150px] rounded-full" />

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <span className="inline-flex px-5 py-2 rounded-full border border-violet-500/40 bg-violet-600/20 text-violet-300 text-sm">
              🚀 AI Powered Freelance Platform
            </span>

            <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight">
              Build Your
              <span className="block text-violet-500">Dream Team</span>
            </h1>

            <p className="mt-8 text-slate-300 text-xl leading-9 max-w-xl">
              DevHub automatically recommends the perfect developers, designers,
              marketers and media experts based on your budget and project
              goals.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                to="/register"
                className="bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-2xl font-semibold transition hover:scale-105"
              >
                Start Project
              </Link>

              <Link
                to="/register"
                className="border border-white/20 hover:bg-white/10 px-8 py-4 rounded-2xl transition"
              >
                Explore Projects
              </Link>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mt-16">
              <div>
                <h2 className="text-4xl font-bold">5K+</h2>

                <p className="text-slate-400">Projects</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">12K+</h2>

                <p className="text-slate-400">Freelancers</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-green-400">$2M+</h2>

                <p className="text-slate-400">Paid</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-3xl font-bold">AI Team Builder</h2>

              <p className="text-slate-400 mt-2">Based on your budget.</p>

              <div className="mt-8 space-y-5">
                {[
                  ["Frontend Developer", "Senior"],
                  ["Backend Developer", "Mid-Level"],
                  ["UI / UX Designer", "Senior"],
                  ["Content Creator", "Junior"],
                  ["SEO Specialist", "Mid-Level"],
                  ["Media Buyer", "Senior"],
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.03,
                    }}
                    className="bg-slate-900/60 rounded-xl border border-slate-700 px-5 py-4 flex justify-between"
                  >
                    <span>{item[0]}</span>

                    <span className="text-green-400">{item[1]}</span>
                  </motion.div>
                ))}
              </div>

              <button className="mt-8 w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-xl font-semibold">
                Build My Team
              </button>
            </div>

            {/* Floating Cards */}

            <motion.div
              animate={{
                y: [-12, 12, -12],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -top-8 right-0 bg-violet-600 px-6 py-4 rounded-2xl shadow-xl"
            >
              ⭐ 4.9 Rating
            </motion.div>

            <motion.div
              animate={{
                y: [12, -12, 12],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute -bottom-8 left-0 bg-slate-900 border border-slate-700 px-6 py-4 rounded-2xl"
            >
              👨‍💻 AI Matching
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
