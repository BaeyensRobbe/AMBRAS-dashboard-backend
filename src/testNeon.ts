import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const test = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connection successful:", res.rows);
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await pool.end();
  }
};

test();
