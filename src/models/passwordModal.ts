import {pool} from "../db";

export const addPassword = async (data: {
  name: string;
  username?: string;
  password: string; // encrypted string
}) => {
  const result = await pool.query(
    "INSERT INTO passwords (name, username, password) VALUES ($1, $2, $3) RETURNING *",
    [data.name, data.username, data.password]
  );
  return result.rows[0];
};

export const getPasswords = async () => {
  const result = await pool.query("SELECT * FROM passwords ORDER BY created_at DESC");
  return result.rows;
};

