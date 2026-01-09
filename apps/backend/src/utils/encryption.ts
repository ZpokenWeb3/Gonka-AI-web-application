import crypto from 'crypto';

const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY_HEX || ENCRYPTION_KEY_HEX.length !== 64) {
  throw new Error('ENCRYPTION_KEY must be 64 hex chars (32 bytes) for AES-256');
}

const KEY = Buffer.from(ENCRYPTION_KEY_HEX, 'hex');

export function encrypt(plaintext: string): { ciphertext: Buffer; nonce: Buffer } {
  const nonce = crypto.randomBytes(12); 
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, nonce);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag(); 

  const contentEncrypted = Buffer.concat([encrypted, authTag]);

  return {
    ciphertext: contentEncrypted,
    nonce,
  };
}

export function decrypt(contentEncrypted: Buffer, nonce: Buffer): string {
  const authTag = contentEncrypted.slice(-16);
  const ciphertext = contentEncrypted.slice(0, -16);

  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, nonce);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}