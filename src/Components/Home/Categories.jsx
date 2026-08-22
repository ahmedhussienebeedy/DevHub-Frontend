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
    icon: Code2,
    title: "Web Development",
    jobs: "2,300+ Experts",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    jobs: "900+ Experts",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    jobs: "1,400+ Experts",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    jobs: "1,800+ Experts",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Camera,
    title: "Media Production",
    jobs: "700+ Experts",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: PenTool,
    title: "Content Creation",
    jobs: "1,000+ Experts",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    jobs: "600+ Experts",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    jobs: "450+ Experts",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    jobs: "520+ Experts",
    color: "from-sky-500 to-cyan-500",
  },
];

export default function Categories() {
  return (
    <section className="py-32 bg-slate-950">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="text-violet-400 font-semibold">
            CATEGORIES
          </span>

          <h2 className="text-5xl font-black mt-4">
            One Platform
            <span className="text-violet-500">
              {" "}Every Skill
            </span>
          </h2>

          <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg">
            Whether you're building software, launching a marketing campaign,
            creating media content, or scaling a business, DevHub finds the
            right professionals automatically.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {categories.map((category, index) => {

            const Icon = category.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group relative"
              >

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-2xl transition duration-500 from-violet-600/20 to-cyan-500/20" />

                <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8">

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">
                    {category.title}
                  </h3>

                  <p className="text-slate-400 mt-3">
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