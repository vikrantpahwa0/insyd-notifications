import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import notificationRoutes from "./routes/notifications.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for dev only)
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/notifications", notificationRoutes);
app.use(
  "/comments",
  (req, res, next) => {
    req.io = io;
    next();
  },
  commentRoutes
);

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  if (userId) {
    socket.join(userId); // 👈 now you can emit to io.to(userId)
  }

  socket.on("disconnect", () => {});
});

export default io;

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
