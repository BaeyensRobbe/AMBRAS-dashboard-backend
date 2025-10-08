import * as TaskModal from '../models/taskModal';
import { Request, Response } from 'express';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModal.getTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const getUpcomingTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModal.getUpcomingTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching upcoming tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, due_date, reminder_offset } = req.body;
    if (!title || !due_date) {
      return res.status(400).json({ error: 'Title and due_date are required for tasks' });
    }
    const newTask = await TaskModal.addTask({
      title,
      description,
      due_date,
      reminder_offset
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}