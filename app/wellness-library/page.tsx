import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Wellness Library", description: "General wellness education and service guides from AAGA Wellness Centre." };
const articles = [
  ["Understanding a wellness consultation","What to ask and what information may be useful before your first visit."],
  ["Questions to ask before a therapy session","Learn why suitability, precautions and practitioner guidance matter."],
  ["Building realistic wellness habits","A practical introduction to sustainable everyday routines."]
];
export default function Library() {
 return <section className="container-shell py-20"><p className="eyebrow">Wellness Library</p><h1 className="section-title mt-4 max-w-3xl">Clear information for more informed conversations.</h1><p className="mt-5 max-w-2xl leading-7 text-muted">Educational articles will be added here after review. Health-related content should be checked by an appropriately qualified professional before publication.</p><div className="mt-12 grid gap-5 md:grid-cols-3">{articles.map(([title,desc])=><article key={title} className="rounded-3xl bg-white p-7 shadow-soft"><p className="eyebrow">Coming soon</p><h2 className="mt-4 text-xl font-semibold text-forest">{title}</h2><p className="mt-3 text-sm leading-7 text-muted">{desc}</p><Link href="/contact" className="mt-6 inline-block text-sm font-semibold text-forest underline underline-offset-4">Ask AAGA a question</Link></article>)}</div></section>;
}
