import { motion } from "framer-motion";
import TeamCard from "./TeamCard";

export default function TeamBoard({
  formData,
  back,
  publish,
  loading,
}) {

  const completed = formData.team.filter(
    (member) => member.freelancer
  ).length;

  const progress =
    formData.team.length === 0
      ? 0
      : Math.round((completed / formData.team.length) * 100);

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-5xl font-black">
            AI Hiring Board
          </h1>

          <p className="text-slate-400 mt-3">
            DevHub generated your perfect team.
          </p>

        </div>

        <button
          onClick={back}
          className="text-violet-400"
        >
          ← Back
        </button>

      </div>

      {/* Progress */}

      <div className="mt-12 bg-slate-900 rounded-3xl p-8 border border-slate-800">

        <div className="flex justify-between">

          <h2 className="text-2xl font-bold">
            Team Progress
          </h2>

          <span className="text-violet-400">
            {completed}/{formData.team.length}
          </span>

        </div>

        <div className="mt-6 h-4 rounded-full bg-slate-800 overflow-hidden">

          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
          />

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">

        {formData.team.map((member) => (

          <TeamCard
            key={member.id}
            member={member}
          />

        ))}

      </div>

      {/* Footer */}

      <div className="mt-16 flex gap-5">

        <button
          onClick={back}
          className="flex-1 py-4 rounded-2xl border border-slate-700 hover:bg-slate-800"
        >
          Back
        </button>

        <button
          onClick={publish}
          disabled={loading}
          className="flex-1 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 font-semibold"
        >
          {loading ? "Publishing..." : "🚀 Publish Project"}
        </button>

      </div>

    </div>
  );
}