import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, postId, text } = req.body;
  const io = req.io;

  try {
    const commentRes = await pool.query(
      "INSERT INTO comments (user_id, post_id, text) VALUES ($1, $2, $3) RETURNING *",
      [userId, postId, text]
    );
    const newComment = commentRes.rows[0];

    const usersRes = await pool.query("SELECT id FROM users WHERE id != $1", [
      userId,
    ]);
    const otherUsers = usersRes.rows;

    // Get commenter email and post title
    const metaRes = await pool.query(
      `SELECT u.email, p.title 
       FROM users u, posts p 
       WHERE u.id = $1 AND p.id = $2`,
      [userId, postId]
    );
    const { email, title } = metaRes.rows[0];
    const notificationMessage = `${email} commented on ${title}`;

    for (const user of otherUsers) {
      await pool.query(
        "INSERT INTO notifications (recipient_id, comment_id) VALUES ($1, $2)",
        [user.id, newComment.id]
      );

      io.to(user.id.toString()).emit("notify", {
        message: notificationMessage,
        fromUserId: userId,
        postId,
      });
    }

    res.status(200).json({ message: "Comment posted and notifications sent." });
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
