import type { MetadataRoute } from "next";
import { treatments } from "@/data/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aagawellness.com";
  const pages = ["", "/about", "/treatments", "/contact", "/wellness-library", "/privacy"];
  const staticEntries = pages.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7
  }));
  const treatmentEntries = treatments.map(item => ({
    url: `${base}/treatments/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65
  }));
  return [...staticEntries, ...treatmentEntries];
}
