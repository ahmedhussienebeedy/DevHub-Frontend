
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import {
  BriefcaseBusiness,
  Rocket,
  DollarSign,
  UserRound,
  FolderOpen,
  FolderKanban,
  Hand,
  Mail,
  Users,
  ArrowRight,
  Clock3,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://devhub-backend-production-113b.up.railway.app/api";

export default function FreelancerDashboard() {
  const [projects, setProjects] = useState([]);
  const [myWork, setMyWork] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingWork, setLoadingWork] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchMyWork();
  }, []);

  // ======================================
  // Get Open Projects
  // ======================================
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
const { data } = await axios.get(`${API_URL}/projects/open/all`);
      setProjects(data.projects || []);
    } catch (error) {
      console.error(
        "Failed to fetch projects:",
        error.response?.data || error.message
      );
    } finally {
      setLoadingProjects(false);
    }
  };

  // ======================================
  // Get My Work
  // ======================================
  const fetchMyWork = async () => {
    try {
      setLoadingWork(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
    `${API_URL}/projects/my-work`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setMyWork(data.projects || []);
      setTotalEarnings(data.totalEarnings || 0);
    } catch (error) {
      console.error(
        "Failed to fetch my work:",
        error.response?.data || error.message
      );
    } finally {
      setLoadingWork(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* ======================================
          Background
      ====================================== */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full" />

        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-fuchsia-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 px-5 py-10 max-w-7xl mx-auto">

        {/* ======================================
            Header
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <p className="text-violet-400 font-semibold mb-2">
                Freelancer Dashboard
              </p>

              <h1 className="text-4xl md:text-5xl font-black text-white">
                Welcome Ahmed 👋
              </h1>

              <p className="text-slate-400 mt-3 text-lg">
                Find the right position, apply, and grow your career.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                to="/freelancer/applications"
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-semibold transition hover:scale-105"
              >
                <Mail size={19} />
                My Applications
              </Link>

              <Link
                to="/freelancer/work"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white font-semibold transition hover:scale-105"
              >
                <FolderKanban size={19} />
                My Work
              </Link>

            </div>
          </div>
        </motion.div>

        {/* ======================================
            Stats
        ====================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">

          <StatsCard
            icon={<FolderOpen size={24} />}
            title="Available Projects"
            value={projects.length}
            description="Open opportunities"
          />

          <StatsCard
            icon={<Rocket size={24} />}
            title="Active Work"
            value={myWork.length}
            description="Projects in progress"
          />

          <StatsCard
            icon={<DollarSign size={24} />}
            title="Total Earnings"
            value={`$${totalEarnings}`}
            description="Paid & released"
          />

          <StatsCard
            icon={<UserRound size={24} />}
            title="Account"
            value="Freelancer"
            description="Active account"
          />

        </div>

        {/* ======================================
            Available Projects
        ====================================== */}

        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

            <div>
              <h2 className="text-3xl font-black text-white">
                Available Projects
              </h2>

              <p className="text-slate-400 mt-1">
                Choose a project and apply for the position that matches your
                experience.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Hand size={17} className="text-violet-400" />
              Select your best position
            </div>

          </div>

          {/* ======================================
              Loading
          ====================================== */}

          {loadingProjects && (

            <div className="grid md:grid-cols-2 gap-6">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="h-80 rounded-3xl bg-white/5 border border-white/10 animate-pulse"
                />

              ))}

            </div>

          )}

          {/* ======================================
              Empty
          ====================================== */}

          {!loadingProjects && projects.length === 0 && (

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center"
            >
              <FolderOpen
                size={55}
                className="mx-auto text-slate-600 mb-5"
              />

              <h3 className="text-2xl font-bold text-white">
                No Projects Available
              </h3>

              <p className="text-slate-400 mt-3">
                Check again later for new opportunities.
              </p>
            </motion.div>

          )}

          {/* ======================================
              Projects
          ====================================== */}

          {!loadingProjects && projects.length > 0 && (

            <div className="grid md:grid-cols-2 gap-6">

              {projects.map((project, index) => {

                const positions = project.team || [];

                const availablePositions = positions.filter(
                  (position) => position.status !== "assigned"
                );

                return (

                  <motion.div
                    key={project._id}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -7,
                    }}
                    className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl transition-all hover:border-violet-500/50 hover:shadow-violet-500/10"
                  >

                    {/* Project Header */}

                    <div className="flex justify-between items-start gap-4">

                      <div className="flex-1">

                        <h3 className="text-2xl font-bold text-white group-hover:text-violet-300 transition">
                          {project.title}
                        </h3>

                        <p className="text-slate-400 mt-3 line-clamp-3">
                          {project.description}
                        </p>

                      </div>

                      <span className="bg-green-500/10 border border-green-500/30 text-green-400 px-3 py-1.5 rounded-full text-sm whitespace-nowrap">
                        {project.status}
                      </span>

                    </div>

                    {/* Project Info */}

                    <div className="grid grid-cols-2 gap-4 mt-7">

                      <InfoBox
                        label="Project Budget"
                        value={`$${project.budget}`}
                        icon={<DollarSign size={17} />}
                      />

                      <InfoBox
                        label="AI Estimated"
                        value={
                          project.estimatedCost
                            ? `$${project.estimatedCost}`
                            : "Not calculated"
                        }
                        icon={<Rocket size={17} />}
                      />

                      <InfoBox
                        label="Category"
                        value={project.category}
                        icon={<BriefcaseBusiness size={17} />}
                      />

                      <InfoBox
                        label="Positions"
                        value={`${availablePositions.length} Available`}
                        icon={<Users size={17} />}
                      />

                    </div>

                    {/* Skills */}

                    {project.skills?.length > 0 && (

                      <div className="mt-6">

                        <p className="text-sm text-slate-500 mb-3">
                          Required Skills
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {project.skills.map((skill, skillIndex) => (

                            <span
                              key={skillIndex}
                              className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-slate-200"
                            >
                              {skill}
                            </span>

                          ))}

                        </div>

                      </div>

                    )}

                    {/* Position Preview */}

                    {positions.length > 0 && (

                      <div className="mt-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-5">

                        <div className="flex items-center justify-between mb-4">

                          <h4 className="font-bold text-white">
                            Recommended Positions
                          </h4>

                          <span className="text-xs text-violet-400">
                            {availablePositions.length} available
                          </span>

                        </div>

                        <div className="space-y-2">

                          {availablePositions.slice(0, 3).map(
                            (position, positionIndex) => (

                              <div
                                key={
                                  position.id ||
                                  position._id ||
                                  positionIndex
                                }
                                className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
                              >

                                <div className="flex items-center gap-3">

                                  <div className="w-9 h-9 rounded-lg bg-violet-600/20 flex items-center justify-center">
                                    <BriefcaseBusiness
                                      size={17}
                                      className="text-violet-400"
                                    />
                                  </div>

                                  <div>

                                    <p className="text-white font-semibold text-sm">
                                      {position.role}
                                    </p>

                                    <p className="text-slate-500 text-xs">
                                      {position.level}
                                    </p>

                                  </div>

                                </div>

                                <span className="text-green-400 text-sm font-semibold">
                                  ${position.salary || 0}
                                </span>

                              </div>

                            )
                          )}

                        </div>

                        {availablePositions.length > 3 && (

                          <p className="text-xs text-slate-500 mt-3">
                            + {availablePositions.length - 3} more positions
                          </p>

                        )}

                      </div>

                    )}

                    {/* Client */}

                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">

                      <div>

                        <p className="text-xs text-slate-500">
                          Posted by
                        </p>

                        <p className="text-white font-semibold mt-1">
                          {project.client?.name || "Client"}
                        </p>

                      </div>

                      {project.deadline && (

                        <div className="text-right">

                          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                            <Clock3 size={14} />
                            Deadline
                          </div>

                          <p className="text-slate-300 text-sm mt-1">
                            {new Date(
                              project.deadline
                            ).toLocaleDateString()}
                          </p>

                        </div>

                      )}

                    </div>

                    {/* Open Project */}

                    <Link
                      to={`/projects/${project._id}`}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-3.5 rounded-xl text-white font-semibold transition group-hover:shadow-lg group-hover:shadow-violet-500/20"
                    >
                      View Positions & Apply
                      <ArrowRight
                        size={19}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>

                  </motion.div>

                );
              })}

            </div>

          )}

        </div>

        {/* ======================================
            Active Work
        ====================================== */}

        {!loadingWork && myWork.length > 0 && (

          <div className="mt-16">

            <div className="mb-6">

              <h2 className="text-3xl font-black text-white">
                Active Work
              </h2>

              <p className="text-slate-400 mt-1">
                Projects you are currently working on.
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {myWork.map((project) => (

                <motion.div
                  key={project._id}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-xl border border-green-500/20 rounded-3xl p-6"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>

                      <p className="text-slate-400 mt-2">
                        {project.category}
                      </p>

                    </div>

                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                      In Progress
                    </span>

                  </div>

                  <div className="flex justify-between mt-6">

                    <div>
                      <p className="text-xs text-slate-500">
                        Budget
                      </p>

                      <p className="text-green-400 font-bold mt-1">
                        ${project.budget}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        Client
                      </p>

                      <p className="text-white font-semibold mt-1">
                        {project.client?.name || "Client"}
                      </p>
                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        )}

      </div>
    </section>
  );
}

// ======================================
// Stats Card
// ======================================

function StatsCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-2xl"
    >

      <div className="flex items-start justify-between">

        <div className="w-12 h-12 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center text-violet-400">
          {icon}
        </div>

        <span className="text-xs text-green-400">
          Active
        </span>

      </div>

      <p className="text-slate-400 mt-5">
        {title}
      </p>

      <h3 className="text-3xl font-black mt-1">
        {value}
      </h3>

      <p className="text-xs text-slate-500 mt-2">
        {description}
      </p>

    </motion.div>
  );
}

// ======================================
// Info Box
// ======================================

function InfoBox({
  label,
  value,
  icon,
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">

      <div className="flex items-center gap-2 text-slate-500 text-xs">
        {icon}
        {label}
      </div>

      <p className="text-white font-semibold mt-2 truncate">
        {value}
      </p>

    </div>
  );
}

