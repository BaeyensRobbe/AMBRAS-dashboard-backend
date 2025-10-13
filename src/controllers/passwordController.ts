import * as PasswordModal from "../models/passwordModal";
import { Request, Response } from "express";
import { encrypt, decrypt } from "../utils/encryption";

export const getPasswords = async (req: Request, res: Response) => {
  try {
    const passwords = await PasswordModal.getPasswords();

    const decryptedRows = passwords.map((row) => {
      let decryptedPassword: string;

      try {
        decryptedPassword = decrypt(row.password);
      } catch (err) {
        console.error("Failed to decrypt password for row:", row.id, err);
        decryptedPassword = "[decryption failed]";
      }

      return {
        ...row,
        password: decryptedPassword,
      };
    });

    res.json(decryptedRows);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const addPassword = async (req: Request, res: Response) => {
  try {
    const { name, username, notes, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }

    const encrypted = encrypt(password);
    const newPassword = await PasswordModal.addPassword({
      name,
      username,
      password: encrypted,
    });

    res.status(201).json(newPassword);
  } catch (error) {
    console.error("Error adding password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
