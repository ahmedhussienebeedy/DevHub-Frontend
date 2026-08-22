import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Palette,
  Megaphone,
  Camera,
  PenTool,
  Brain,
  Shield,
  Briefcase,
} from "lucide-react";

const categories = [
  {
    id: "development",
    icon: Code2,
    title: "Web Development",
    jobs: "2,300+ Experts",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Apps",
    jobs: "900+ Experts",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "design",
    icon: Palette,
    title: "UI / UX Design",
    jobs: "1,400+ Experts",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    jobs: "1,800+ Experts",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "media",
    icon: Camera,
    title: "Media Production",
    jobs: "700+ Experts",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "content",
    icon: PenTool,
    title: "Content Creation",
    jobs: "1,000+ Experts",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "ai",
    icon: Brain,
    title: "Artificial Intelligence",
    jobs: "600+ Experts",
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: "security",
    icon: Shield,
    title: "Cyber Security",
    jobs: "450+ Experts",
    color: "from-red-500 to-pink-500",
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business Consulting",
    jobs: "520+ Experts",
    color: "from-sky-500 to-cyan-500",
  },
];

export default function StepCategory({
  formData,
  setFormData,
  next,
}) {
  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-black text-center">
        Choose Your Project Category
      </h1>

      <p className="text-slate-400 text-center mt-5 text-lg">
        Select the main category and our AI will build the perfect team.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

        {categories.map((category) => {

          const Icon = category.icon;

          const selected =
            formData.category === category.id;

          return (

            <motion.div
              key={category.id}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              whileTap={{
                scale: .98,
              }}
              onClick={() =>
                setFormData({
                  ...formData,
                  category: category.id,
                })
              }
              className={`cursor-pointer rounded-3xl p-8 transition-all border
              ${
                selected
                  ? "border-violet-500 bg-violet-500/10 shadow-[0_0_45px_rgba(139,92,246,.35)]"
                  : "border-slate-800 bg-slate-900"
              }`}
            >

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${category.color}`}
              >
                <Icon size={30} />
              </div>

              <h2 className="text-2xl font-bold mt-8">
                {category.title}
              </h2>

              <p className="text-slate-400 mt-3">
                {category.jobs}
              </p>

              {selected && (
                <div className="mt-8">

                  <span className="px-4 py-2 rounded-full bg-violet-600 text-white text-sm">
                    ✓ Selected
                  </span>

                </div>
              )}

            </motion.div>

          );

        })}

      </div>

      <div className="flex justify-end mt-14">

        <button
          disabled={!formData.category}
          onClick={next}
          className="px-10 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
        >
          Continue →
        </button>

      </div>

    </div>
  );
}