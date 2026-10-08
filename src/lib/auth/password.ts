// src/lib/auth/password.ts
import { scrypt, timingSafeEqual, randomBytes } from "node:crypto";

/**
 * Verify a password against a Werkzeug scrypt hash.
 *
 * Werkzeug scrypt format: "scrypt:n:r:p$salt$hash"
 *   - n, r, p are integer parameters
 *   - salt and hash are base64 URL‑safe strings without padding
 */
export async function verifyWerkzeugScrypt(
  password: string,
  storedHash: string
): Promise<boolean> {
  try {
    const [algo, nStr, rStr, pAndRest] = storedHash.split(":");
    if (algo !== "scrypt") return false;
    const [pStr, saltB64, hashB64] = pAndRest.split("$");
    const N = parseInt(nStr, 10);
    const r = parseInt(rStr, 10);
    const p = parseInt(pStr, 10);
    if (Number.isNaN(N) || Number.isNaN(r) || Number.isNaN(p)) return false;
    const decode = (b64: string) => {
      const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
      const fixed = b64.replace(/-/g, "+").replace(/_/g, "/") + pad;
      return Buffer.from(fixed, "base64");
    };
    const salt = decode(saltB64);
    const hash = decode(hashB64);
    const derived = await new Promise<Buffer>((resolve, reject) => {
      scrypt(password, salt, hash.length, { N, r, p }, (err, key) => {
        if (err) reject(err);
        else resolve(key as Buffer);
      });
    });
    if (derived.length !== hash.length) return false;
    return timingSafeEqual(derived, hash);
  } catch {
    return false;
  }
}

/**
 * Generate a Werkzeug-compatible scrypt hash for a password.
 */
export async function generateWerkzeugScrypt(password: string): Promise<string> {
  const N = 16384; // 2^14
  const r = 8;
  const p = 1;
  const salt = randomBytes(16);
  
  const hash = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, { N, r, p }, (err, key) => {
      if (err) reject(err);
      else resolve(key as Buffer);
    });
  });

  const encode = (buf: Buffer) => 
    buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  return `scrypt:${N}:${r}:${p}$${encode(salt)}$${encode(hash)}`;
}
