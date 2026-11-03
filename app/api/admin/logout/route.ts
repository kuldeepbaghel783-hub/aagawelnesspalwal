import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth";
import { isSameOrigin } from "@/lib/http";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ success: false }, { status: 403 });
  await destroyAdminSession();
  return NextResponse.json({ success: true });
}
