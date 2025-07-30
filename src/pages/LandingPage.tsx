import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import NotificationBell from "../components/NotificationBell";
import { initSocket, getSocket } from "../configs/socket";
import { useParams } from "@tanstack/react-router";

const LandingPage = () => {
  const { userId, email } = useParams({ from: "/landing-page/$userId/$email" });
  const user = { email, userId };
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [commentsByPostId, setCommentsByPostId] = useState({});

  const fetchCommentsForPost = async (postId) => {
    try {
      const res = await fetch(
        `https://insyd-notifications.onrender.com/posts/comments/${postId}`
      );
      const data = await res.json();
      setCommentsByPostId((prev) => ({
        ...prev,
        [postId]: data.comments || [],
      }));
    } catch (err) {
      console.error("Error fetching post comments:", err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://insyd-notifications.onrender.com/posts"
        );
        const data = await res.json();
        setPosts(data.postsWithComments);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Fetch notifications when page mounts
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `https://insyd-notifications.onrender.com/notifications/${userId}`
        );
        const data = await res.json();
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    initSocket(userId);
    const socket = getSocket();

    const handleNotification = async (data) => {
      const { fromUserId, message, postId } = data;

      // Avoid self-notification
      if (fromUserId === userId) return;

      // Append new notification
      const newNotification = {
        message,
      };

      setNotifications((prev) => [newNotification, ...prev]);
      await fetchCommentsForPost(postId);
    };

    socket.on("notify", handleNotification);

    return () => {
      socket.off("notify", handleNotification);
    };
  }, [userId]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.welcome}>Welcome, {user.email}</h2>
        <NotificationBell notifications={notifications} />
      </header>

      <div style={styles.postList}>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={user}
            comments={commentsByPostId[post.id] || post.comments || []}
            refreshComments={() => fetchCommentsForPost(post.id)}
          />
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
