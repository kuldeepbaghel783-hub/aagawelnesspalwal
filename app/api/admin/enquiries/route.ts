import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/lib/models/Enquiry";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(300).lean();
    return NextResponse.json({ success: true, enquiries: enquiries.map((item: any) => ({ ...item, _id: item._id.toString(), createdAt: item.createdAt?.toISOString(), updatedAt: item.updatedAt?.toISOString() })) });
  } catch (error) {
    console.error("Loading enquiries failed:", error);
    return NextResponse.json({ success: false, message: "Could not load enquiries." }, { status: 500 });
  }
}

const updateSchema = z.object({ status: z.enum(["new", "contacted", "booked", "closed"]) });

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const parsed = updateSchema.extend({ id: z.string().regex(/^[a-f\d]{24}$/i) }).safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, message: "Invalid update." }, { status: 400 });
    await connectDB();
    const updated = await Enquiry.findByIdAndUpdate(parsed.data.id, { status: parsed.data.status }, { new: true });
    if (!updated) return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Updating enquiry failed:", error);
    return NextResponse.json({ success: false, message: "Could not update enquiry." }, { status: 500 });
  }
}
