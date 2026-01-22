"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.computeContentHash = computeContentHash;
exports.verifyContentIntegrity = verifyContentIntegrity;
const crypto_1 = __importDefault(require("crypto"));
const KEY_HEX = process.env.ENCRYPTION_KEY;
if (!KEY_HEX || KEY_HEX.length !== 64) {
    throw new Error("ENCRYPTION_KEY must be 64 hex chars (32 bytes)");
}
const KEY = Buffer.from(KEY_HEX, "hex");
const ALGO = "aes-256-gcm";
function encrypt(text) {
    const nonce = crypto_1.default.randomBytes(12);
    const cipher = crypto_1.default.createCipheriv(ALGO, KEY, nonce);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    const ciphertextB64 = Buffer.concat([encrypted, tag]).toString("base64");
    const nonceB64 = nonce.toString("base64");
    return { ciphertextB64, nonceB64 };
}
function decrypt(ciphertextB64, nonceB64) {
    const data = Buffer.from(ciphertextB64, "base64");
    const nonce = Buffer.from(nonceB64, "base64");
    const tag = data.subarray(data.length - 16);
    const ciphertext = data.subarray(0, data.length - 16);
    const decipher = crypto_1.default.createDecipheriv(ALGO, KEY, nonce);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return decrypted.toString("utf8");
}
function computeContentHash(content) {
    return crypto_1.default.createHash("sha256").update(content, "utf8").digest("hex");
}
function verifyContentIntegrity(content, storedHash) {
    const computedHash = computeContentHash(content);
    return computedHash === storedHash;
}
