import { motion } from "framer-motion";
import {
  FolderPlus,
  BrainCircuit,
  Users,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: FolderPlus,
    title: "Create Your Project",
    description:
      "Describe your idea, choose the category, budget and deadline.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: BrainCircuit,
    title: "AI Analyzes Everything",
    description:
      "DevHub analyzes your project requirements and calculates the ideal team based on your budget.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Users,
    title: "Perfect Team Built",
    description:
      "We recommend developers, designers, marketers and media specialists with the right experience level.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Rocket,
    title: "Launch Faster",
    description:
      "Your team starts immediately while you track everything from one smart dashboard.",
    color: "from-orange-500 to-red-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/10 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="text-violet-400 font-semibold uppercase tracking-[4px]">
            HOW IT WORKS
          </span>

          <h2 className="mt-5 text-5xl font-black">
            Build A Complete Team
            <span className="text-violet-500">
              {" "}
              In Minutes
            </span>
          </h2>

          <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg leading-8">
            Forget searching for freelancers one by one.
            DevHub automatically builds the perfect team
            according to your project requirements,
            timeline and budget.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * .15,
                  duration: .6,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
                className="relative group"
              >

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition duration-500 blur-xl from-violet-600/20 to-cyan-500/20" />

                <div className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full">

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center`}
                  >
                    <Icon size={32} />
                  </div>

                  <div className="mt-8">

                    <span className="text-violet-400 font-bold">
                      Step {index + 1}
                    </span>

                    <h3 className="mt-3 text-2xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-slate-400 leading-7">
                      {step.description}
                    </p>

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}