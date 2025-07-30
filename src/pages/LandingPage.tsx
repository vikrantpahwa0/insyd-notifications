import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import NotificationBell from "../components/NotificationBell";
import socket from "../configs/socket";

const LandingPage = ({ user = { email: "vikrantpahwa0@gmail.com" } }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Sunset View",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format",
      comments: [
        {
          user: { email: "alice@example.com" },
          content: "Amazing shot!",
        },
      ],
    },
    {
      id: 2,
      name: "Mountain Peaks",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format",
      comments: [
        {
          user: { email: "bob@example.com" },
          content: "This is breathtaking.",
        },
      ],
    },
    {
      id: 3,
      name: "City Lights",
      url: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&auto=format",
      comments: [],
    },
  ]);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.welcome}>Welcome, {user.email}</h2>
        <NotificationBell notifications={notifications} />
      </header>

      <div style={styles.postList}>
        {posts.map((post) => (
          <Post key={post.id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    padding: "30px 15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  welcome: {
    margin: 0,
    fontSize: "1.25rem",
    color: "#333",
  },
  postList: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
};

export default LandingPage;
