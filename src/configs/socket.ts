import { io } from "socket.io-client";

// Replace with your actual backend Socket.IO server URL
const socket = io("http://localhost:3000", {
  withCredentials: true, // only if you need cookies/auth
  transports: ["websocket"], // recommended for stable connections
});

export default socket;
