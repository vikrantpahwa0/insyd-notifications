import pg from "pg";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;
