import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Trash2, CheckCircle } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API_URL}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(data.notifications);
    } catch (error) {
      console.error(error);
    }
  };

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
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 pt-28 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <Bell className="text-violet-500" size={28} />
          <h1 className="text-3xl font-bold text-white">
            Notifications
          </h1>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 && (
            <div className="bg-slate-900 rounded-xl p-8 text-center text-slate-400">
              No notifications yet.
            </div>
          )}

          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`rounded-xl border p-5 ${
                notification.isRead
                  ? "bg-slate-900 border-slate-800"
                  : "bg-slate-800 border-violet-600"
              }`}
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-white font-bold">
                    {notification.title}
                  </h2>

                  <p className="text-slate-300 mt-2">
                    {notification.body}
                  </p>

                  {notification.sender && (
                    <p className="text-violet-400 text-sm mt-2">
                      From: {notification.sender.name}
                    </p>
                  )}

                  <p className="text-slate-500 text-xs mt-2">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">

                  {!notification.isRead && (
                    <button
                      onClick={() =>
                        markAsRead(notification._id)
                      }
                      className="p-2 rounded-lg bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteNotification(notification._id)
                    }
                    className="p-2 rounded-lg bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}