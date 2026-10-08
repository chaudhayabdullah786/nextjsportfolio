#!/usr/bin/env node
/**
 * scripts/reset-admin-password.mjs
 *
 * LOCAL-ONLY admin password reset utility for the Next.js portfolio.
 *
 * Safety guarantees:
 *  - Reads the password interactively with no terminal echo (never stored).
 *  - Asks for confirmation; aborts on mismatch.
 *  - Enforces a minimum password length.
 *  - Hashes with Werkzeug-compatible scrypt (matches src/lib/auth/password.ts).
 *  - If multiple admin records exist, prompts the operator to choose one.
 *  - Updates ONLY passwordHash; no other fields are touched.
 *  - Verifies the new hash before reporting success.
 *  - Never prints the plaintext password or the resulting hash.
 *
 * Usage:
 *   npm run admin:reset-password
 */

import { createInterface } from "node:readline";
import { scrypt, timingSafeEqual, randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Loads environment variables from .env.local and .env into process.env.
 * Does not overwrite existing environment variables.
 */
function loadEnv() {
  const rootDir = path.resolve(__dirname, "..");
  const envFiles = [".env.local", ".env"];
  
  for (const file of envFiles) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      content.split("\n").forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || "";
          if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
          else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
          
          if (process.env[key] === undefined) {
            process.env[key] = value;
          }
        }
      });
    }
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_PASSWORD_LENGTH = 12;

// Werkzeug-compatible scrypt parameters (must match password.ts)
const SCRYPT_N = 16384; // 2^14
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_KEY_LEN = 64;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Base-64 URL-safe encode (no padding) — matches Werkzeug encoding.
 * @param {Buffer} buf
 * @returns {string}
 */
function b64urlEncode(buf) {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Base-64 URL-safe decode — matches Werkzeug decoding.
 * @param {string} b64
 * @returns {Buffer}
 */
function b64urlDecode(b64) {
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const fixed = b64.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(fixed, "base64");
}

/**
 * Generate a Werkzeug-compatible scrypt hash.
 * Format: scrypt:<N>:<r>:<p>$<salt_b64url>$<hash_b64url>
 *
 * @param {string} password
 * @returns {Promise<string>}
 */
async function generateHash(password) {
  const salt = randomBytes(16);
  const hash = await new Promise((resolve, reject) => {
    scrypt(password, salt, SCRYPT_KEY_LEN, { N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P }, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
  // Correct Werkzeug format: scrypt:N:r:p$<salt>$<hash>
  return `scrypt:${SCRYPT_N}:${SCRYPT_R}:${SCRYPT_P}$${b64urlEncode(salt)}$${b64urlEncode(hash)}`;
}

/**
 * Verify a plaintext password against a Werkzeug scrypt hash string.
 * Format: scrypt:<N>:<r>:<p>$<salt_b64url>$<hash_b64url>
 *
 * @param {string} password
 * @param {string} storedHash
 * @returns {Promise<boolean>}
 */
async function verifyHash(password, storedHash) {
  try {
    const parts = storedHash.split(":");
    if (parts.length < 4 || parts[0] !== "scrypt") return false;
    const [, nStr, rStr, rest] = parts;
    const segments = rest.split("$");
    if (segments.length !== 3) return false;
    const [pStr, saltB64, hashB64] = segments;
    const N = parseInt(nStr, 10);
    const r = parseInt(rStr, 10);
    const p = parseInt(pStr, 10);
    if (Number.isNaN(N) || Number.isNaN(r) || Number.isNaN(p)) return false;
    const salt = b64urlDecode(saltB64);
    const expectedHash = b64urlDecode(hashB64);
    const derived = await new Promise((resolve, reject) => {
      scrypt(password, salt, expectedHash.length, { N, r, p }, (err, key) => {
        if (err) reject(err);
        else resolve(key);
      });
    });
    if (derived.length !== expectedHash.length) return false;
    return timingSafeEqual(derived, expectedHash);
  } catch {
    return false;
  }
}

/**
 * Read a single line from stdin WITHOUT echoing characters.
 * Uses raw mode on TTY so keystrokes are not displayed.
 *
 * @param {string} prompt
 * @returns {Promise<string>}
 */
function readPasswordSilently(prompt) {
  return new Promise((resolve, reject) => {
    process.stdout.write(prompt);

    const chars = [];

    const onData = (chunk) => {
      for (let i = 0; i < chunk.length; i++) {
        const byte = chunk.charCodeAt ? chunk.charCodeAt(i) : chunk[i];
        if (byte === 0x0d || byte === 0x0a) {
          // Enter key
          process.stdin.removeListener("data", onData);
          process.stdin.removeListener("error", onError);
          if (process.stdin.isTTY) process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write("\n");
          resolve(chars.join(""));
          return;
        } else if (byte === 0x7f || byte === 0x08) {
          // Backspace / delete
          chars.pop();
        } else if (byte === 0x03) {
          // Ctrl-C
          process.stdin.removeListener("data", onData);
          process.stdin.removeListener("error", onError);
          if (process.stdin.isTTY) process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write("\n");
          reject(new Error("Aborted by user (Ctrl-C)."));
          return;
        } else {
          chars.push(typeof byte === "number" ? String.fromCharCode(byte) : byte);
        }
      }
    };

    const onError = (err) => {
      reject(err);
    };

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", onData);
    process.stdin.on("error", onError);
  });
}

/**
 * Read a plain (echoed) line from stdin.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
function readLine(prompt) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=".repeat(60));
  console.log("  Admin Password Reset Utility  (LOCAL DEV ONLY)");
  console.log("=".repeat(60));
  console.log("");

  loadEnv();

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || !dbUrl.includes("localhost")) {
    console.error("DATABASE_URL is not configured for the local reset utility.");
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    // ── 1. Find all admin_user records ────────────────────────────────────────
    const admins = await prisma.adminUser.findMany({
      select: { id: true, username: true, email: true },
    });

    if (admins.length === 0) {
      console.error("ERROR: No admin_user records found in the database.");
      process.exit(1);
    }

    let target;

    if (admins.length === 1) {
      target = admins[0];
      console.log(`Found 1 admin account: ${target.username} (${target.email})`);
      console.log("");
    } else {
      // Multiple admins — require the operator to select one by username.
      console.log(`Found ${admins.length} admin accounts:`);
      admins.forEach((a) => console.log(`  • ${a.username} (${a.email})`));
      console.log("");

      const chosen = await readLine("Enter the username to reset: ");

      if (!chosen) {
        console.error("ERROR: No username entered. Aborting.");
        process.exit(1);
      }

      target = admins.find((a) => a.username === chosen);
      if (!target) {
        console.error(`ERROR: Username "${chosen}" not found. Aborting.`);
        process.exit(1);
      }
    }

    console.log(`Resetting password for: ${target.username}`);
    console.log("");

    // ── 2. Read new password (silent) ─────────────────────────────────────────
    const newPassword = await readPasswordSilently("New password: ");

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      console.error(
        `\nERROR: Password must be at least ${MIN_PASSWORD_LENGTH} characters. Aborting.`
      );
      process.exit(1);
    }

    const confirm = await readPasswordSilently("Confirm password: ");

    if (newPassword !== confirm) {
      console.error("\nERROR: Passwords do not match. Aborting.");
      process.exit(1);
    }

    // ── 3. Hash the new password ──────────────────────────────────────────────
    process.stdout.write("\nHashing password… ");
    const newHash = await generateHash(newPassword);
    console.log("done.");

    // ── 4. Update ONLY the passwordHash field ─────────────────────────────────
    await prisma.adminUser.update({
      where: { id: target.id },
      data: { passwordHash: newHash },
      select: { id: true }, // retrieve nothing sensitive
    });

    // ── 5. Verify new hash against the stored record ──────────────────────────
    const stored = await prisma.adminUser.findUnique({
      where: { id: target.id },
      select: { passwordHash: true },
    });

    if (!stored) {
      console.error("ERROR: Could not retrieve updated record for verification.");
      process.exit(1);
    }

    const ok = await verifyHash(newPassword, stored.passwordHash);

    if (ok) {
      console.log("✓ Password reset successful. Verification passed.");
    } else {
      console.error(
        "✗ CRITICAL: Hash verification failed after update. The password may not work correctly."
      );
      process.exit(1);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err.message ?? err);
  process.exit(1);
});
