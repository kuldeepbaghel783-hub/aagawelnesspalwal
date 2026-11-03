import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/lib/models/Enquiry";
import { allowAttempt } from "@/lib/rateLimit";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^[+0-9()\-\s]{8,16}$/),
  service: z.string().trim().min(2).max(100),
  preferredTime: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().max(500).optional().default("")
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowAttempt(`enquiry:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ success: false, message: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Please check the form details." }, { status: 400 });
    }
    await connectDB();
    const enquiry = await Enquiry.create(parsed.data);
    return NextResponse.json({ success: true, id: enquiry._id.toString(), message: "Your enquiry has been received. AAGA will contact you." }, { status: 201 });
  } catch (error) {
    console.error("Enquiry creation failed:", error);
    return NextResponse.json({ success: false, message: "Unable to submit your enquiry right now. Please contact AAGA on WhatsApp." }, { status: 500 });
  }
}
