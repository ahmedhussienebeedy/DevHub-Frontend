import { motion } from "framer-motion";
import {
  Bell,
  CreditCard,
  MessageCircle,
  CheckCircle,
  XCircle,
  Briefcase,
} from "lucide-react";

export default function NotificationToast({ notification }) {
  const icons = {
    payment: <CreditCard className="text-green-400" size={28} />,
    message: <MessageCircle className="text-sky-400" size={28} />,
    accepted: <CheckCircle className="text-green-500" size={28} />,
    rejected: <XCircle className="text-red-500" size={28} />,
    application: <Briefcase className="text-violet-400" size={28} />,
    completed: <CheckCircle className="text-emerald-400" size={28} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 120, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 120 }}
      transition={{ duration: 0.35 }}
      className="flex items-start gap-4"
    >
      <div className="mt-1">
        {icons[notification.type] || (
          <Bell className="text-violet-400" size={28} />
        )}
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-white">
          {notification.title}
        </h3>

        <p className="text-sm text-slate-300 mt-1">
          {notification.body}
        </p>
      </div>
    </motion.div>
  );
}