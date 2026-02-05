import crypto from "crypto";

const KEY_HEX = process.env.ENCRYPTION_KEY;

if (!KEY_HEX || KEY_HEX.length !== 64) {
  throw new Error("ENCRYPTION_KEY must be 64 hex chars (32 bytes)");
}

const KEY = Buffer.from(KEY_HEX, "hex");

const ALGO = "aes-256-gcm";

export function encrypt(text: string): { ciphertextB64: string; nonceB64: string } {
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, KEY, nonce);

  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  const ciphertextB64 = Buffer.concat([encrypted, tag]).toString("base64");
  const nonceB64 = nonce.toString("base64");

  return { ciphertextB64, nonceB64 };
}

export function decrypt(ciphertextB64: string, nonceB64: string): string {
  const data = Buffer.from(ciphertextB64, "base64");
  const nonce = Buffer.from(nonceB64, "base64");

  const tag = data.subarray(data.length - 16);
  const ciphertext = data.subarray(0, data.length - 16);

  const decipher = crypto.createDecipheriv(ALGO, KEY, nonce);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

  return decrypted.toString("utf8");
}

export function computeContentHash(content: string): string {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex");
}

export function verifyContentIntegrity(content: string, storedHash: string): boolean {
  const computedHash = computeContentHash(content);
  return computedHash === storedHash;
}
