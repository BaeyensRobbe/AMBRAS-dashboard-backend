import { pool } from '../db';

export const addTask = async (data: {
  title: string;
  description?: string;
  due_date: string; // ISO date string
  reminder_offset?: string; // minutes before due_date 

}) => {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, due_date, reminder_offset)
     VALUES ($1, $2, $3, $4::interval)
     RETURNING *,
       (due_date - COALESCE($4::interval, '0 minutes')) AS reminder_time`,
    [data.title, data.description ?? null, data.due_date, data.reminder_offset ?? null]
  );
  return result.rows[0];
}

export const getTasks = async () => {
  const result = await pool.query(
    `SELECT *,
       (due_date - COALESCE(reminder_offset, '0 minutes')) AS reminder_time
     FROM tasks
     ORDER BY due_date DESC`
  );
  return result.rows;
};

export const getUpcomingTasks = async () => {
  const result = await pool.query(
    `SELECT *
     FROM tasks
     WHERE due_date > NOW()
     ORDER BY due_date ASC`
  );
  return result.rows;
}