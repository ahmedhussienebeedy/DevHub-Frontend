import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { analyzeProject } from "../../ai/aiEngine";

export default function AIAnalysis({
  formData,
  setFormData,
  next,
  back,
}) {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const [currentStep, setCurrentStep] = useState(
    "Reading project details..."
  );

  useEffect(() => {
    const steps = [
      "Reading project details...",
      "Detecting technologies...",
      "Calculating project budget...",
      "Building the best team...",
      "Finalizing AI recommendation...",
    ];

    let stepIndex = 0;

    const stepTimer = setInterval(() => {
      stepIndex++;

      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex]);
      }
    }, 800);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          clearInterval(stepTimer);

          const result = analyzeProject(
            formData.category,
            formData.projectType,
            formData.description
          );

          setAnalysis(result);

          setFormData((prevData) => ({
            ...prevData,
            team: result.team,
            estimatedCost: result.budget,
            complexity: result.complexity,
            duration: result.duration,
            matchScore: result.match,
            features: result.features,
          }));

          setFinished(true);

          return 100;
        }

        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto">

      <button
        onClick={back}
        className="text-violet-400 mb-10"
      >
        ← Back
      </button>

      <h1 className="text-5xl font-black text-center">
        🤖 AI Project Analysis
      </h1>

      <p className="text-slate-400 text-center mt-4">
        DevHub AI is analyzing your project...
      </p>

      <div className="mt-16">

        <div className="h-5 rounded-full bg-slate-800 overflow-hidden">

          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
          />

        </div>

        <p className="text-center mt-4 text-2xl font-bold">
          {progress}%
        </p>

        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6 text-violet-400 text-lg"
        >
          {currentStep}
        </motion.p>

      </div>
            {finished && analysis && (

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 space-y-8"
        >

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

              <h3 className="text-slate-400">
                Complexity
              </h3>

              <p className="text-3xl font-bold text-violet-400 mt-4">
                {analysis.complexity}
              </p>

            </div>

            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

              <h3 className="text-slate-400">
                Duration
              </h3>

              <p className="text-3xl font-bold text-cyan-400 mt-4">
                {analysis.duration} Days
              </p>

            </div>

            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

              <h3 className="text-slate-400">
                Budget
              </h3>

              <p className="text-3xl font-bold text-green-400 mt-4">
                ${analysis.budget}
              </p>

            </div>

            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

              <h3 className="text-slate-400">
                AI Match
              </h3>

              <p className="text-3xl font-bold text-yellow-400 mt-4">
                {analysis.match}%
              </p>

            </div>

          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

            <h2 className="text-3xl font-bold mb-8">
              ✨ AI Detected Features
            </h2>

            <div className="flex flex-wrap gap-4">

              {analysis.features?.map((feature, index) => (

                <div
                  key={index}
                  className="px-5 py-3 rounded-xl bg-violet-600/20 border border-violet-500 text-violet-300"
                >
                  {feature}
                </div>

              ))}

            </div>

          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

            <h2 className="text-3xl font-bold mb-8">
              👥 Recommended Team
            </h2>

            <div className="space-y-5">

              {analysis.team.map((member, index) => (

                <div
                  key={index}
                  className="bg-slate-800 rounded-2xl p-6 flex justify-between items-center"
                >

                  <div>

                    <h3 className="text-xl font-bold">
                      {member.role}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      {member.level}
                    </p>

                  </div>

                  <div className="text-right">

                    <h2 className="text-2xl font-bold text-green-400">
                      ${member.salary}
                    </h2>

                  </div>

                </div>

              ))}

            </div>

          </div>
                    <div className="flex justify-between gap-5">

            <button
              onClick={back}
              className="flex-1 py-4 rounded-2xl border border-slate-700 hover:bg-slate-800 transition"
            >
              ← Back
            </button>

            <button
              onClick={next}
              className="flex-1 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 transition font-semibold"
            >
              Continue →
            </button>

          </div>

        </motion.div>

      )}

    </div>

  );
}