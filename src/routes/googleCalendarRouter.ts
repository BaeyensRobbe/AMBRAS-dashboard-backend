import { Router } from "express";
import { getEvents, createOrUpdateEvent, getNextEvent } from "../controllers/googleCalendarController";

const router = Router();

router.get("/", getEvents);           // GET /google-calendar
router.post("/", createOrUpdateEvent); // POST /google-calendar
router.get("/next", getNextEvent);    // GET /google-calendar/next

export default router;
