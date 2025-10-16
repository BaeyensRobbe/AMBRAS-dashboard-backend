import { Router } from "express";
import { getEvents, createOrUpdateEvent } from "../controllers/googleCalendarController";

const router = Router();

router.get("/", getEvents);           // GET /google-calendar
router.post("/", createOrUpdateEvent); // POST /google-calendar

export default router;
