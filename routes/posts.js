import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await pool.query("SELECT * FROM posts");
  const comments = await pool.query("SELECT * FROM comments");
  res.json({ posts: posts.rows, comments: comments.rows });
});

export default router;
