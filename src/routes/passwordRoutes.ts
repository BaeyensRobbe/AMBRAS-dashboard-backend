import { Router } from "express";
import * as passwordController from "../controllers/passwordController";

const router = Router();

router.get("/", passwordController.getPasswords);
router.post("/", passwordController.addPassword);

export default router;