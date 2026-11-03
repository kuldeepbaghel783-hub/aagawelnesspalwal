import { connectDB } from "@/lib/mongodb";
import SiteContent from "@/lib/models/SiteContent";
import { siteDefaults } from "@/data/site-defaults";

export async function getSiteContent() {
  try {
    await connectDB();
    const record = await SiteContent.findOne({ key:"main" }).lean() as any;
    if (!record?.content) return siteDefaults;
    return {
      ...siteDefaults,
      ...record.content,
      brand: { ...siteDefaults.brand, ...record.content.brand },
      hero: { ...siteDefaults.hero, ...record.content.hero },
      about: { ...siteDefaults.about, ...record.content.about },
      practitioner: { ...siteDefaults.practitioner, ...record.content.practitioner },
      footer: { ...siteDefaults.footer, ...record.content.footer },
      treatments: Array.isArray(record.content.treatments) ? record.content.treatments : siteDefaults.treatments,
      gallery: Array.isArray(record.content.gallery) ? record.content.gallery : siteDefaults.gallery
    };
  } catch {
    return siteDefaults;
  }
}
