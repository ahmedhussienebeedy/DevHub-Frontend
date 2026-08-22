import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  SquarePen,
  UsersRound,
  MessageCircleMore,
  Trash2,
  FolderKanban,
  CheckCircle2,
  Clock3,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

import bgVideo from "../../assets/videos/dashboard.mp4";

export default function ClientDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================================
  // Fetch Projects
  // ======================================

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found.");
        setLoading(false);
        return;
      }

 const { data } = await axios.get(
  "https://devhub-backend-production-113b.up.railway.app/api/projects/my-projects",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setProjects(data.projects || []);
    } catch (error) {
      console.error(
        "Failed to fetch projects:",
        error.response?.data || error.message
      );

      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // Delete Project
  // ======================================

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
  `https://devhub-backend-production-113b.up.railway.app/api/projects/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete project."
      );
    }
  };

  // ======================================
  // Stats
  // ======================================

  const activeProjects = projects.filter(
    (project) =>
      project.status === "in-progress" ||
      project.status === "active"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  ).length;

  const projectsWithFreelancers = projects.filter(
    (project) => project.freelancer
  ).length;

  // ======================================
  // Render
  // ======================================

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* ======================================
          Background Video
      ====================================== */}

      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* ======================================
          Background Overlay
      ====================================== */}

      <div className="fixed inset-0 bg-slate-950/75 pointer-events-none" />

      {/* ======================================
          Glow Effects
      ====================================== */}

      <div className="fixed top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="fixed bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ======================================
          Main Content
      ====================================== */}

      <motion.main
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-10"
      >
        {/* ======================================
            Header
        ====================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-violet-400 font-semibold mb-2">
              Client Dashboard
            </p>

            <h1 className="text-4xl md:text-5xl font-black">
              Welcome Ahmed 👋
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Build amazing projects faster with talented freelancers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/client/create-project"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/30"
            >
              <SquarePen size={18} />
              Create Project
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-6 py-3 rounded-xl text-white hover:bg-white/15 hover:-translate-y-1 transition"
            >
              <FolderKanban size={18} />
              Analytics
            </button>
          </div>
        </div>

        {/* ======================================
            Stats
        ====================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {/* Total Projects */}

          <motion.div
            whileHover={{
              scale: 1.03,
              y: -6,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <FolderKanban size={24} />
              </div>

              <span className="text-xs text-slate-500">
                All time
              </span>
            </div>

            <p className="text-slate-400 text-sm mt-5">
              Total Projects
            </p>

            <p className="text-3xl font-black mt-1">
              {projects.length}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              All your projects
            </p>
          </motion.div>

          {/* Active Projects */}

          <motion.div
            whileHover={{
              scale: 1.03,
              y: -6,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Clock3 size={24} />
              </div>

              <span className="text-xs text-slate-500">
                Current
              </span>
            </div>

            <p className="text-slate-400 text-sm mt-5">
              Active Projects
            </p>

            <p className="text-3xl font-black mt-1">
              {activeProjects}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Currently in progress
            </p>
          </motion.div>

          {/* Freelancers */}

          <motion.div
            whileHover={{
              scale: 1.03,
              y: -6,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <UsersRound size={24} />
              </div>

              <span className="text-xs text-slate-500">
                Assigned
              </span>
            </div>

            <p className="text-slate-400 text-sm mt-5">
              Freelancers
            </p>

            <p className="text-3xl font-black mt-1">
              {projectsWithFreelancers}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Assigned to projects
            </p>
          </motion.div>

          {/* Completed */}

          <motion.div
            whileHover={{
              scale: 1.03,
              y: -6,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-green-600/15 border border-green-500/20 flex items-center justify-center text-green-400">
                <CheckCircle2 size={24} />
              </div>

              <span className="text-xs text-slate-500">
                Finished
              </span>
            </div>

            <p className="text-slate-400 text-sm mt-5">
              Completed
            </p>

            <p className="text-3xl font-black mt-1">
              {completedProjects}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Successfully completed
            </p>
          </motion.div>
        </div>

        {/* ======================================
            Projects Header
        ====================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-3xl font-black">
              Recent Projects
            </h2>

            <p className="text-slate-400 mt-1">
              Manage your projects and freelancers.
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {projects.length}{" "}
            {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {/* ======================================
            Loading
        ====================================== */}

        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 rounded-3xl bg-white/5 border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          /* ======================================
             Empty State
          ====================================== */

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
              <FolderKanban
                size={36}
                className="text-violet-400"
              />
            </div>

            <h3 className="text-2xl font-bold mt-6">
              No Projects Yet 🚀
            </h3>

            <p className="text-slate-400 mt-3 max-w-md mx-auto">
              Create your first project and start working with talented
              freelancers.
            </p>

            <Link
              to="/client/create-project"
              className="inline-flex items-center gap-2 mt-7 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-semibold transition hover:-translate-y-1"
            >
              <SquarePen size={18} />
              Create Project
            </Link>
          </motion.div>
        ) : (
          /* ======================================
             Projects
          ====================================== */

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl hover:border-violet-500/40 hover:shadow-violet-500/10 transition-all"
              >
                {/* Project Header */}

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold truncate">
                      {project.title}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {project.category || "General"}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      project.status === "completed"
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : project.status === "in-progress" ||
                          project.status === "active"
                        ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                        : "bg-violet-500/10 border-violet-500/20 text-violet-400"
                    }`}
                  >
                    {project.status || "open"}
                  </span>
                </div>

                {/* Description */}

                <p className="text-slate-400 mt-5 line-clamp-3 leading-7">
                  {project.description}
                </p>

                {/* Skills */}

                <div className="flex flex-wrap gap-2 mt-6">
                  {(project.skills || [])
                    .slice(0, 5)
                    .map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                </div>

                {/* Project Info */}

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-slate-900/70 rounded-xl p-3">
                    <p className="text-xs text-slate-500">
                      Budget
                    </p>

                    <p className="text-green-400 font-bold mt-1">
                      ${project.budget || 0}
                    </p>
                  </div>

                  <div className="bg-slate-900/70 rounded-xl p-3">
                    <p className="text-xs text-slate-500">
                      Freelancer
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <UserRound
                        size={14}
                        className="text-slate-500 shrink-0"
                      />

                      <p className="text-white font-semibold truncate">
                        {project.freelancer?.name ||
                          "Not assigned"}
                      </p>
                    </div>
                  </div>
                </div>

              
{/* Applications */}

{!project.freelancer && project.status === "open" && (
  <Link
    to={`/client/projects/${project._id}/applications`}
    className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600/10 border border-violet-500/20 px-4 py-3 font-semibold text-violet-400 hover:bg-violet-600 hover:text-white transition"
  >
    <UsersRound size={18} />
    View Applications
  </Link>
)}


                {/* Actions */}

                <div className="flex flex-wrap gap-3 mt-4">
                  {project.freelancer && (
                    <Link
                      to={`/project/${project._id}/chat`}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 px-5 py-3 font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/40"
                    >
                      <MessageCircleMore size={18} />
                      Chat
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      deleteProject(project._id)
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/40 active:scale-95"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.main>
    </div>
  );
} 