import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  Clock3,
  CheckCircle2,
  User,
} from "lucide-react";

export default function TeamCard({ member }) {
  const assigned = member.freelancer;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden"
    >
      {/* Avatar */}

      <div className="p-8 flex flex-col items-center">

        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center">

          {assigned ? (
            <img
              src={assigned.avatar}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={45} />
          )}

        </div>

        <h2 className="text-2xl font-bold mt-6 text-center">
          {member.role}
        </h2>

        <p className="text-violet-400 mt-2">
          {member.level}
        </p>

      </div>

      {/* Info */}

      <div className="border-t border-slate-800 p-6 space-y-5">

        <div className="flex justify-between">

          <span className="flex items-center gap-2 text-slate-400">
            <DollarSign size={18} />
            Salary
          </span>

          <span className="text-green-400 font-bold">
            ${member.salary}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="flex items-center gap-2 text-slate-400">
            <Users size={18} />
            Applicants
          </span>

          <span>
            {member.applicants?.length || 0}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">
            Status
          </span>

          {assigned ? (
            <span className="flex items-center gap-2 text-green-400">
              <CheckCircle2 size={18} />
              Assigned
            </span>
          ) : (
            <span className="flex items-center gap-2 text-yellow-400">
              <Clock3 size={18} />
              Waiting
            </span>
          )}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        {assigned ? (

          <button className="w-full rounded-xl py-3 bg-green-600 hover:bg-green-700 transition">
            View Freelancer
          </button>

        ) : (

          <button
            disabled
            className="w-full rounded-xl py-3 bg-slate-800 text-slate-500 cursor-not-allowed"
          >
            Waiting For Applicants
          </button>

        )}

      </div>

    </motion.div>
  );
}