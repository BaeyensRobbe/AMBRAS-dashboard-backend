import * as eventsModal from "../models/eventModal";
import { Request, Response } from "express";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventsModal.getEvents();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNextEvent = async (req: Request, res: Response) => {
  try {
    const nextEvent = await eventsModal.getNextEvent();
    res.json(nextEvent);
  } catch (error) {
    console.error("Error fetching next event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const addEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, start_time, end_time, all_day, location, reminder_offset, reminder_time, recurrence_rule, recurrence_end, status } = req.body;
    const newEvent = await eventsModal.addEvent({
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
      status
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};