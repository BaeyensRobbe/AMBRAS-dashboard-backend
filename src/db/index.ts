import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool: Pool;

if (!globalThis.pgPool) {
  globalThis.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  globalThis.pgPool.on("connect", () => {
    console.log("Connected to Neon DB");
  });
}

pool = globalThis.pgPool;

export { pool };
