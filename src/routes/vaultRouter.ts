import express from "express";
import { getItems, addItem, updateItem, deleteItem, decryptPassword } from "../controllers/vaultController";

const router = express.Router();

// Routes
router.get("/", getItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.post("/:id/decrypt", decryptPassword);

// ✅ Export as default
export default router;
