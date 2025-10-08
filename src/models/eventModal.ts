import { pool } from "../db";

export const addEvent = async (data: {
  title: string;
  description?: string;
  start_time: string; // ISO date string
  end_time?: string;  // ISO date string
  all_day?: boolean;
  location?: string;
  reminder_offset?: string; // e.g., '1 day', '2 hours'
  reminder_time?: string;   // ISO date string
  recurrence_rule?: string;
  recurrence_end?: string;  // ISO date string
  status?: string;
}) => {
  const {
    title,
    description = null,
    start_time,
    end_time = null,
    all_day = false,
    location = null,
    reminder_offset = null,
    reminder_time = null,
    recurrence_rule = null,
    recurrence_end = null,
    status = "confirmed",
  } = data;

  const result = await pool.query(
    `INSERT INTO events
      (title, description, start_time, end_time, all_day, location, reminder_offset, reminder_time, recurrence_rule, recurrence_end, status)
     VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [
      title,
      description,
      start_time,
      end_time,
      all_day,
      location,
      reminder_offset,
      reminder_time,
      recurrence_rule,
      recurrence_end,
      status,
    ]
  );

  return result.rows[0];
};


export const getEvents = async () => {
  const result = await pool.query("SELECT * FROM events ORDER BY start_time DESC");
  return result.rows;
}

export const getNextEvent = async () => {
  const result = await pool.query("SELECT * FROM events WHERE start_time > NOW() ORDER BY start_time ASC LIMIT 1");
  return result.rows[0];
}