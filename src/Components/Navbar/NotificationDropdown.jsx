import axios from "axios";
import { Link } from "react-router-dom";
import { Bell, CheckCircle, XCircle, Briefcase } from "lucide-react";
import { useSocket } from "../../Context/SocketContext";

const API_URL =
  import.meta.env.VITE_API_URL || "https://devhub-backend-production-113b.up.railway.app/api";

export default function NotificationDropdown({ close }) {
  const { notifications, setNotifications } = useSocket();

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API_URL}/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );

      close();
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "application":
        return <Briefcase size={18} className="text-blue-400" />;

      case "accepted":
        return <CheckCircle size={18} className="text-green-400" />;

      case "rejected":
        return <XCircle size={18} className="text-red-400" />;

      default:
        return <Bell size={18} className="text-violet-400" />;
    }
  };

  if (!notifications.length) {
    return (
      <div className="absolute right-0 top-14 w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6">
        <p className="text-center text-slate-400">
          No notifications yet
        </p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-14 w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-white font-bold text-lg">
          Notifications
        </h2>

        <Link
          to="/notifications"
          onClick={close}
          className="text-violet-400 text-sm hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="max-h-[450px] overflow-y-auto">
        {notifications.slice(0, 5).map((notification) => (
          <Link
            key={notification._id}
            to="/notifications"
            onClick={() => markAsRead(notification._id)}
            className={`flex gap-3 p-4 border-b border-slate-800 hover:bg-slate-800 transition ${
              !notification.isRead ? "bg-slate-800/40" : ""
            }`}
          >
            <div className="mt-1">
              {getIcon(notification.type)}
            </div>

            <div className="flex-1">
              <h3 className="text-white font-semibold">
                {notification.title}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {notification.body}
              </p>

              {notification.sender && (
                <p className="text-xs text-violet-400 mt-2">
                  From: {notification.sender.name}
                </p>
              )}
            </div>

            {!notification.isRead && (
              <div className="w-2 h-2 rounded-full bg-violet-500 mt-2"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}