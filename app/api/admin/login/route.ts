import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createAdminSession } from "@/lib/auth";
import { allowAttempt } from "@/lib/rateLimit";
import { isSameOrigin } from "@/lib/http";

const schema = z.object({ email: z.string().email().max(150), password: z.string().min(1).max(200) });

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ success: false, message: "Invalid request origin." }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowAttempt(`admin-login:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ success: false, message: "Too many login attempts. Try again later." }, { status: 429 });
  }
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 400 });

    const email = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!email || !passwordHash) {
      return NextResponse.json({ success: false, message: "Admin credentials are not configured on the server." }, { status: 503 });
    }

    const emailMatches = parsed.data.email.toLowerCase() === email.toLowerCase();
    const passwordMatches = await bcrypt.compare(parsed.data.password, passwordHash);
    if (!emailMatches || !passwordMatches) {
      return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
    }
    await createAdminSession(email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ success: false, message: "Unable to sign in." }, { status: 500 });
  }
}
