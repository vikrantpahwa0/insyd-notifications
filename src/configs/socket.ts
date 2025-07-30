import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  socket = io("https://insyd-notifications.onrender.com", {
    query: { userId },
  });
  return socket;
};

export const getSocket = () => socket;
