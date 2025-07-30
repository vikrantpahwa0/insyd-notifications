// src/components/Post.jsx
import React, { useState } from "react";
// import axios from "../api";

const Post = ({ key, post, user }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleComment = async () => {
    // const res = await axios.post(`/posts/${post.id}/comment`, {
    //   userId: user.id,
    //   content: comment,
    // });
    // setComments((prev) => [...prev, res.data]);
    // setComment("");
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
