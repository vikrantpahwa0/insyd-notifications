import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );
  if (result.rows.length > 0) {
    res.json({ success: true, user: result.rows[0] });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

export default router;
