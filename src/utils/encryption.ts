// src/utils/encryption.ts
import crypto from "crypto";

const KEY = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex"); // 32 bytes
const ALGO = "aes-256-gcm";
const IV_LENGTH = 12;

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Combine everything into one string: iv:tag:ciphertext
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decrypt(payload: string): string {
  try {
    if (!payload) return ""; // empty or null value

    const parts = payload.split(":");
    if (parts.length !== 3) {
      console.warn("Skipping decryption, invalid payload format:", payload);
      return payload; // return as-is if not in expected format
    }

    const [ivHex, tagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
  } catch (err) {
    console.error("Decryption failed:", err, payload);
    return payload; // fallback: return original string
  }
}

