import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, postId, content } = req.body;

  try {
    // 1. Insert comment
    const commentRes = await pool.query(
      "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *",
      [userId, postId, content]
    );
    const newComment = commentRes.rows[0];

    // 2. Get all other users
    const usersRes = await pool.query("SELECT id FROM users WHERE id != $1", [
      userId,
    ]);
    const otherUsers = usersRes.rows;

    // 3. Insert notifications for each other user
    for (const user of otherUsers) {
      await pool.query(
        "INSERT INTO notifications (recipient_id, comment_id) VALUES ($1, $2)",
        [user.id, newComment.id]
      );

      // 4. Emit via WebSocket
      if (clients[user.id]) {
        clients[user.id].send(
          JSON.stringify({
            type: "notification",
            data: {
              commentId: newComment.id,
              fromUserId: userId,
              postId,
              content,
              createdAt: newComment.created_at,
            },
          })
        );
      }
    }

    res.status(200).json({ message: "Comment posted and notifications sent." });
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
