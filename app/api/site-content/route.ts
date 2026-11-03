import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteContent from "@/lib/models/SiteContent";
import { siteDefaults } from "@/data/site-defaults";
import { getSiteContent } from "@/lib/site-content";
import { getAdminSession } from "@/lib/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";
export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json({ success:true, content });
}

const contentSchema = z.object({
  brand: z.object({
    name:z.string().min(2).max(120), logo:z.string().max(500).optional().default("/aaga-logo.png"), phone:z.string().min(8).max(20),
    email:z.string().max(150).optional().default(""),
    address:z.string().min(5).max(300), cityLine:z.string().max(100)
  }),
  hero: z.object({
    eyebrow:z.string().max(120), title:z.string().min(5).max(180),
    subtitle:z.string().min(10).max(500), image:z.string().min(1).max(500),
    primaryText:z.string().max(60), secondaryText:z.string().max(60)
  }),
  about: z.object({ title:z.string().max(180), description:z.string().max(1200), image:z.string().max(500) }),
  practitioner: z.object({
    name:z.string().min(2).max(100), title:z.string().max(150),
    bio:z.string().max(1200), image:z.string().max(500), qualifications:z.string().max(500).optional().default("")
  }),
  treatments:z.array(z.object({
    slug:z.string().min(2).max(100), name:z.string().min(2).max(100),
    short:z.string().max(300), category:z.string().max(100), image:z.string().max(500), active:z.boolean()
  })).max(30),
  gallery:z.array(z.object({ title:z.string().max(100), image:z.string().max(500), caption:z.string().max(300) })).max(20),
  footer:z.object({ tagline:z.string().max(300), whatsappText:z.string().max(60) })
});

export async function PUT(request:Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({success:false,message:"Unauthorized"},{status:401});
  try {
    const parsed = contentSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({success:false,message:"Please check the content fields.",issues:parsed.error.flatten()},{status:400});
    await connectDB();
    await SiteContent.findOneAndUpdate(
      {key:"main"},
      {$set:{content:parsed.data}},
      {upsert:true,new:true,runValidators:true}
    );
    return NextResponse.json({success:true,message:"Website content saved."});
  } catch(error) {
    console.error("Saving site content failed:",error);
    return NextResponse.json({success:false,message:"Could not save website content."},{status:500});
  }
}
