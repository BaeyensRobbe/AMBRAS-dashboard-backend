import { pool } from "./db";

const testDbConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()"); // simple query
    console.log("Database is connected!");
    console.log("Current timestamp:", result.rows[0]);
  } catch (err) {
    console.error("Error connecting to database:", err);
  } finally {
    await pool.end(); // close connection
  }
};

testDbConnection();
