const vaultModel = require("../models/vaultModal");
const { encrypt, decrypt } = require("../utils/encryption");
import { Request, Response } from "express";

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await vaultModel.getAllItems();
    res.json(items);
  } catch (error) {
    console.error("Error fetching vault items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const addItem = async (req: Request, res: Response) => {
  try {
    const item = req.body;
    if (item.password) {

      const encryptedPassword = encrypt(item.password);
      const newItem = await vaultModel.addItem({ ...item, password: encryptedPassword });
      res.status(201).json(newItem);
      return;
    } else {
      const newItem = await vaultModel.addItem(item);
      res.status(201).json(newItem);
    }
  } catch (error) {
    console.error("Error adding vault item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = req.body;
    const encryptedPassword = encrypt(item.password);
    const updatedItem = await vaultModel.updateItem(id, { ...item, password: encryptedPassword });
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating vault item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await vaultModel.deleteItem(id);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting vault item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const decryptPassword = async (req: Request, res: Response) => {
  try {
    const item = await vaultModel.getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    if (item.type !== "password") return res.status(400).json({ error: "Not a password item" });
    const decrypted = decrypt(item.password);
    res.json({ password: decrypted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}