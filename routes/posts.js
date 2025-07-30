import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const postsWithComments = await pool.query(`SELECT
  p.id,
  p.title AS name,
  p.url,
  COALESCE(
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'user', JSON_BUILD_OBJECT('email', u.email),
        'content', c.text
      )
    ) FILTER (WHERE c.id IS NOT NULL),
    '[]'
  ) AS comments
FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
LEFT JOIN users u ON u.id = c.user_id
GROUP BY p.id, p.title, p.url
ORDER BY p.id`);
  const comments = await pool.query("SELECT * FROM comments");
  res.json({ postsWithComments: postsWithComments.rows });
});

// Get a single post by ID
router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const postRes = await pool.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);

    if (!postRes.rows.length)
      return res.status(404).json({ error: "Post not found" });

    const commentsRes = await pool.query(
      `SELECT comments.*, users.email 
       FROM comments 
       JOIN users ON users.id = comments.user_id 
       WHERE post_id = $1`,
      [postId]
    );

    const post = postRes.rows[0];
    post.comments = commentsRes.rows.map((c) => ({
      content: c.text,
      user: { email: c.email },
    }));

    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
