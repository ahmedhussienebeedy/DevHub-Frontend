import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const teams = {
  Website: [
    ["Frontend Developer", "Senior"],
    ["Backend Developer", "Senior"],
    ["UI / UX Designer", "Mid-Level"],
    ["QA Engineer", "Junior"],
  ],
  Marketing: [
    ["Media Buyer", "Senior"],
    ["SEO Specialist", "Senior"],
    ["Content Creator", "Mid-Level"],
    ["Graphic Designer", "Junior"],
  ],
  Mobile: [
    ["Flutter Developer", "Senior"],
    ["Backend Developer", "Mid-Level"],
    ["UI / UX Designer", "Senior"],
    ["QA Tester", "Junior"],
  ],
};

export default function AITeamBuilder() {
  const [category, setCategory] = useState("Website");
  const [budget, setBudget] = useState(4000);

  const level = useMemo(() => {
    if (budget >= 7000) return "Senior";
    if (budget >= 3000) return "Mid-Level";
    return "Junior";
  }, [budget]);

  return (
    <section className="py-32 bg-slate-900">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="text-violet-400 font-semibold">
            LIVE DEMO
          </span>

          <h2 className="text-5xl font-black mt-4">
            AI Team Builder
          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Choose a category and budget to see how DevHub builds your team automatically.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-20">

          <div className="bg-slate-950 rounded-3xl p-8">

            <h3 className="text-2xl font-bold">
              Project Settings
            </h3>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-8 w-full bg-slate-800 rounded-xl p-4"
            >
              <option>Website</option>
              <option>Mobile</option>
              <option>Marketing</option>
            </select>

            <div className="mt-10">

              <div className="flex justify-between mb-4">
                <span>Budget</span>
                <span className="text-green-400">
                  ${budget}
                </span>
              </div>

              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full"
              />

            </div>

            <div className="mt-8 bg-slate-800 rounded-xl p-5">

              <p className="text-slate-400">
                Experience Level
              </p>

              <h2 className="text-3xl font-bold text-violet-400 mt-2">
                {level}
              </h2>

            </div>

          </div>

          <div className="space-y-4">

            {teams[category].map((member, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.15,
                }}
                className="bg-slate-950 rounded-2xl p-5 flex justify-between items-center border border-slate-800"
              >

                <span className="font-semibold">
                  {member[0]}
                </span>

                <span className="bg-violet-600 px-4 py-2 rounded-full">
                  {level}
                </span>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}