import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Megaphone,
  Camera,
  Video,
  PenTool,
  BrainCircuit,
  Briefcase,
} from "lucide-react";

const categories = [
  {
    title: "Development",
    icon: Code2,
    color: "from-violet-600 to-fuchsia-600",
    jobs: "2,500+ Freelancers",
  },
  {
    title: "UI / UX Design",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    jobs: "1,200+ Designers",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    color: "from-orange-500 to-yellow-500",
    jobs: "950+ Experts",
  },
  {
    title: "Photography",
    icon: Camera,
    color: "from-cyan-500 to-blue-500",
    jobs: "700+ Creators",
  },
  {
    title: "Video Editing",
    icon: Video,
    color: "from-indigo-500 to-violet-600",
    jobs: "800+ Editors",
  },
  {
    title: "Content Writing",
    icon: PenTool,
    color: "from-green-500 to-emerald-500",
    jobs: "600+ Writers",
  },
  {
    title: "AI Specialists",
    icon: BrainCircuit,
    color: "from-purple-500 to-indigo-500",
    jobs: "500+ Experts",
  },
  {
    title: "Business",
    icon: Briefcase,
    color: "from-slate-600 to-slate-800",
    jobs: "400+ Consultants",
  },
];

export default function Categories() {
  return (
    <section className="relative bg-slate-950 py-28 overflow-hidden">

      <div className="absolute left-0 top-40 w-80 h-80 rounded-full bg-violet-600/20 blur-[160px]" />
      <div className="absolute right-0 bottom-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center"
        >

          <span className="text-violet-400 uppercase tracking-[6px] font-semibold">

            Categories

          </span>

          <h2 className="text-5xl font-black mt-5">

            Everything Your Project Needs

          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">

            From developers to media buyers,
            photographers and AI engineers,
            DevHub builds your team automatically.

          </p>

        </motion.div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {categories.map((category, index) => {

            const Icon = category.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .08,
                }}
                whileHover={{
                  y: -12,
                  rotateX: 6,
                  rotateY: -6,
                  scale: 1.03,
                }}
                className="group relative"
              >

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={32} />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">

                    {category.title}

                  </h3>

                  <p className="text-slate-400 mt-4">

                    {category.jobs}

                  </p>

                  <button className="mt-8 text-violet-400 font-semibold group-hover:translate-x-2 transition">

                    Explore →

                  </button>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}