import { motion } from "framer-motion";
import {
  Briefcase,
  DollarSign,
  Users,
  Circle,
  ArrowLeft,
} from "lucide-react";

export default function StepTeamBuilder({
  formData,
  back,
  publish,
  loading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <button
        onClick={back}
        className="flex items-center gap-2 text-violet-400 mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-5xl font-black">
        AI Team Recommendation
      </h1>

      <p className="text-slate-400 mt-3">
        DevHub AI generated the perfect team for your project.
      </p>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">
          <DollarSign className="text-green-400 mb-5" size={30} />
          <p className="text-slate-400">
            Total Budget
          </p>

          <h2 className="text-4xl font-bold mt-3 text-green-400">
            ${formData.estimatedCost}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">
          <Briefcase className="text-cyan-400 mb-5" size={30} />
          <p className="text-slate-400">
            Estimated Duration
          </p>

          <h2 className="text-4xl font-bold mt-3 text-cyan-400">
            {formData.duration} Days
          </h2>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">
          <Users className="text-violet-400 mb-5" size={30} />
          <p className="text-slate-400">
            Team Size
          </p>

          <h2 className="text-4xl font-bold mt-3 text-violet-400">
            {formData.team.length}
          </h2>
        </div>

      </div>

      {/* Positions */}

      <h2 className="text-3xl font-bold mt-16 mb-8">
        Required Positions
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {formData.team.map((member, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -8,
            }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-7"
          >

            <div className="w-20 h-20 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-3xl">
              👤
            </div>

            <h3 className="text-2xl font-bold mt-6 text-center">
              {member.role}
            </h3>

            <p className="text-center text-violet-400 mt-2">
              {member.level}
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Salary
                </span>

                <span className="text-green-400 font-bold">
                  ${member.salary}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Status
                </span>

                <span className="flex items-center gap-2 text-green-400">
                  <Circle size={10} fill="currentColor" />
                  Open
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Applicants
                </span>

                <span className="font-bold">
                  0
                </span>
              </div>

            </div>

          </motion.div>

        ))}

      </div>

      <div className="flex gap-5 mt-14">

        <button
          onClick={back}
          className="flex-1 py-4 rounded-2xl border border-slate-700 hover:bg-slate-800 transition"
        >
          Back
        </button>

        <button
          onClick={publish}
          disabled={loading}
          className="flex-1 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 transition font-semibold"
        >
          {loading ? "Publishing..." : "Publish Project"}
        </button>

      </div>

    </motion.div>
  );
}