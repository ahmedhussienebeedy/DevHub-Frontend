const connectedUsers = new Map();

let ioInstance;

// ======================================
// Initialize Socket
// ======================================
export default function initializeSocket(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("🟢 Socket Connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId.toString());

      connectedUsers.set(userId.toString(), socket.id);

      console.log(`✅ User ${userId} joined room`);
      console.log("📦 Socket Rooms:", [...socket.rooms]);
      console.log("👥 Connected Users:", [...connectedUsers.entries()]);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket Disconnected:", socket.id);

      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }

      console.log("👥 Connected Users:", [...connectedUsers.entries()]);
    });
  });
}

// ======================================
// Send Notification
// ======================================
export function sendNotification(userId, notification) {
  console.log("=================================");
  console.log("📨 Sending Notification");
  console.log("Target User:", userId.toString());

  console.log(
    "Connected:",
    connectedUsers.has(userId.toString())
  );

  console.log(
    "Socket ID:",
    connectedUsers.get(userId.toString())
  );

  if (!ioInstance) {
    console.log("❌ ioInstance is NULL");
    return;
  }

  ioInstance.to(userId.toString()).emit(
    "newNotification",
    notification
  );

  console.log("✅ Notification emitted");
  console.log("=================================");
}

// ======================================
// Send Chat Message
// ======================================
export function sendChatMessage(userId, message) {
  if (!ioInstance) return;

  ioInstance.to(userId.toString()).emit(
    "newMessage",
    message
  );
}