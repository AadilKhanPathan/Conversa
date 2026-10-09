import "dotenv/config";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./src/db/connect.js";
import app from "./app.js";
import user from "./src/models/user.model.js";

connectDB();

const httpServer = createServer(app);

// initialize socket.io server
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    // origin: process.env.FRONTEND_URL
  },
});

// store online users
export const userSocketMap = {}; // { userId: socketId }

// socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlinetUsers", Object.keys(userSocketMap));

  socket.on("disconnected", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlinetUsers", Object.keys(userSocketMap));
  });
});

// Start server
httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
