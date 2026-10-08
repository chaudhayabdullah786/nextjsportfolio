// src/app/admin/login/route.ts
import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validation/admin";
import { getAdminByUsername } from "@/lib/services/admin";
import { verifyWerkzeugScrypt } from "@/lib/auth/password";
import { getSession } from "@/lib/auth/session";

/**
 * POST /admin/login – authenticate an admin user.
 * Expected JSON body: { username: string, password: string }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = adminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }
    const { username, password } = parsed.data;

    const admin = await getAdminByUsername(username);
    if (!admin) {
      // Do not reveal which field is incorrect
      return NextResponse.json(
        { ok: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await verifyWerkzeugScrypt(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session and store adminId
    const session = await getSession();
    session.adminId = admin.id;
    await session.save();

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
