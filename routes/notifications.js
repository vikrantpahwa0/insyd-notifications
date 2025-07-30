// routes/notifications.js

import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET /notifications/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        u.email AS commenter_email,
        p.title AS post_title,
        n.created_at,
        n.is_read
      FROM notifications n
      JOIN comments c ON n.comment_id = c.id
      JOIN users u ON c.user_id = u.id
      JOIN posts p ON c.post_id = p.id
      WHERE n.recipient_id = $1
      ORDER BY n.created_at DESC
      `,
      [userId]
    );

    const notifications = result.rows.map((row) => ({
      message: `${row.commenter_email} commented on ${row.post_title}`,
    }));

    res.json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
