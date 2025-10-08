import { Router } from "express";
import * as eventsController from "../controllers/eventsController";

const router = Router();

router.get("/", eventsController.getEvents);
router.post("/", eventsController.addEvent);
router.get("/next", eventsController.getNextEvent);

export default router;