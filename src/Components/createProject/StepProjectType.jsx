import { motion } from "framer-motion";
import projectTypes from "./projectTypes";

export default function StepProjectType({
  formData,
  setFormData,
  next,
  back,
}) {
  const types = projectTypes[formData.category] || [];

  return (
    <div className="max-w-7xl mx-auto">

      <button
        onClick={back}
        className="text-violet-400 hover:text-violet-300 mb-10"
      >
        ← Back
      </button>

      <h1 className="text-5xl font-black text-center">
        Choose Project Type
      </h1>

      <p className="text-slate-400 text-center mt-5 text-lg">
        Select the type of project you want to build.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

        {types.map((type) => {

          const selected = formData.projectType === type;

          return (

            <motion.div
              key={type}
              whileHover={{
                scale: 1.03,
                y: -8,
              }}
              whileTap={{
                scale: .98,
              }}
              onClick={() =>
                setFormData({
                  ...formData,
                  projectType: type,
                })
              }
              className={`cursor-pointer rounded-3xl border p-8 transition-all duration-300
              ${
                selected
                  ? "border-violet-500 bg-violet-500/10 shadow-[0_0_45px_rgba(139,92,246,.35)]"
                  : "border-slate-800 bg-slate-900"
              }`}
            >

              <h2 className="text-2xl font-bold">
                {type}
              </h2>

              <p className="text-slate-400 mt-4">
                AI will generate the best team for this project.
              </p>

              {selected && (

                <div className="mt-8">

                  <span className="bg-violet-600 px-4 py-2 rounded-full text-sm">
                    ✓ Selected
                  </span>

                </div>

              )}

            </motion.div>

          );

        })}

      </div>

      <div className="flex justify-between mt-16">

        <button
          onClick={back}
          className="px-8 py-4 rounded-2xl border border-slate-700"
        >
          Back
        </button>

        <button
          disabled={!formData.projectType}
          onClick={next}
          className="px-10 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>

      </div>

    </div>
  );
}