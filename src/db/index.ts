import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// ✅ Tell TypeScript that globalThis has pgPool
declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

let pool: Pool;

if (!globalThis.pgPool) {
  globalThis.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // required for Neon
  });

  globalThis.pgPool.on("connect", () => console.log("Connected to Neon DB"));
}

pool = globalThis.pgPool;

export { pool };
