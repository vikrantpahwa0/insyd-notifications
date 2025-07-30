import React, { useState, useEffect } from "react";

const Post = ({ key, post, user, comments, refreshComments }) => {
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    try {
      const res = await fetch(
        `https://insyd-notifications.onrender.com/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: post.id,
            userId: user.userId,
            text: comment,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to post comment");

      setComment("");
      await refreshComments();
    } catch (err) {
      console.error("Comment submission failed:", err);
      window?.prompt?.("Failed to post comment. Try again?");
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 10, margin: 10 }}>
      <h3>{post.name}</h3>
      <img src={post.url} alt={post.name} style={{ width: "100%" }} />

      <div>
        <h4>Comments</h4>
        {comments.map((c, i) => (
          <div key={i}>
            <strong>{c.user.email}</strong>: {c.content}
          </div>
        ))}

        <input
          type="text"
          value={comment}
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleComment}>Post</button>
      </div>
    </div>
  );
};

export default Post;
