import { pool } from "../db/index";
import { VaultItem } from "../types/vaultTypes"; // or same file

export const createItem = async (item: VaultItem) => {
  const { type, title, content, username, password, url, image_url } = item;
  const res = await pool.query(
    `INSERT INTO vault_items
      (type, title, content, username, password, url, image_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [type, title, content, username, password, url, image_url]
  );
  return res.rows[0];
};

export const updateItem = async (id: number, item: VaultItem) => {
  const { title, content, username, password, url, image_url } = item;
  const res = await pool.query(
    `UPDATE vault_items SET title=$1, content=$2, username=$3, password=$4, url=$5, image_url=$6, updated_at=NOW()
     WHERE id=$7 RETURNING *`,
    [title, content, username, password, url, image_url, id]
  );
  return res.rows[0];
};

export const deleteItem = async (id: number) => {
  await pool.query("DELETE FROM vault_items WHERE id=$1", [id]);
};

export const getItemById = async (id: number) => {
  const res = await pool.query("SELECT * FROM vault_items WHERE id=$1", [id]);
  return res.rows[0];
};

export const getAllItems = async () => {
  const res = await pool.query("SELECT * FROM vault_items ORDER BY created_at DESC");
  return res.rows;
};
