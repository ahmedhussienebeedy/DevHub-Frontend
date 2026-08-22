import "dotenv/config";

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/Db.js";
import initializeSocket from "./socket/socket.js";


console.log("Working Directory:", process.cwd());
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Missing");


connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

initializeSocket(io);

const PORT = process.env.PORT || 8000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});