import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "./AuthContext";
import NotificationToast from "../../src/Pages/Notifications/NotificationToast";

const SocketContext = createContext();

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "https://devhub-backend-production-113b.up.railway.app";

const API_URL =
  import.meta.env.VITE_API_URL || "https://devhub-backend-production-113b.up.railway.app/api";

console.log("🌐 API_URL:", API_URL);
console.log("🔌 SOCKET_URL:", SOCKET_URL);

export function SocketProvider({ children }) {
  const { user } = useAuth();

  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // ==========================
  // Connect Socket
  // ==========================
  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {
      console.log("🟢 Socket Connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("🔴 Socket Disconnected");
    });

    // ==========================
    // Receive Notification
    // ==========================
    socketInstance.on("newNotification", (notification) => {
      console.log("🔔 New Notification:", notification);

      setNotifications((prev) => [
        notification,
        ...prev,
      ]);

      toast.custom(
        () => (
          <NotificationToast
            notification={notification}
          />
        ),
        {
          duration: 5000,
        }
      );

      const audio = new Audio("/notification.mp3");
      audio.volume = 0.5;

      audio.play().catch(() => {});
    });

    // ==========================
    // Receive Message
    // ==========================
    socketInstance.on("newMessage", (message) => {
      console.log("💬 New Message:", message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // ==========================
  // Join User Room
  // ==========================
  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("join", user._id);

      console.log("✅ Joined Room:", user._id);
    }
  }, [socket, user]);

  // ==========================
  // Load Notifications
  // ==========================
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        if (!user) return;

        const token = localStorage.getItem("token");

        if (!token) return;

        const { data } = await axios.get(
          `${API_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Notifications Loaded:", data);

        setNotifications(data.notifications);
      } catch (error) {
        console.error(
          "❌ Error loading notifications:",
          error.response?.data || error.message
        );
      }
    };

    loadNotifications();
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}