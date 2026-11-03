import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { treatments as staticTreatments } from "@/data/treatments";
import { getSiteContent } from "@/lib/site-content";
import { CheckCircle2, MessageCircle } from "lucide-react";

export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const site=await getSiteContent();const item=site.treatments.find((t:any)=>t.slug===slug);
 if(!item)return {};
 return {title:`${item.name} in Palwal`,description:`${item.short} Contact AAGA Wellness Centre in Palwal to ask about availability.`};
}
export default async function TreatmentDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const site=await getSiteContent();
 const item=site.treatments.find((t:any)=>t.slug===slug&&t.active);if(!item)notFound();
 const full=staticTreatments.find(t=>t.slug===slug);
 const msg=encodeURIComponent(`Hello AAGA Wellness, I would like to ask about ${item.name}. Please share availability and details.`);
 const expectations=full?.whatToExpect||["Ask the AAGA team about the service and current availability","Discuss suitability, precautions and what a session involves","Confirm details with the practitioner before booking"];
 return <div className="container-shell py-28">
  <p className="eyebrow"><Link href="/treatments">Treatments</Link> / {item.category}</p>
  <div className="mt-8 grid gap-12 md:grid-cols-2"><div className="relative min-h-[390px] overflow-hidden rounded-[28px]"><img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover"/></div><div className="self-center"><h1 className="section-title">{item.name}</h1><p className="mt-6 leading-8 text-muted">{full?.intro||item.short}</p><a className="btn-primary mt-8" href={`https://wa.me/${site.brand.phone.replace(/\D/g,"")}?text=${msg}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Ask about this service</a></div></div>
  <div className="mt-16 grid gap-8 md:grid-cols-[1fr_.8fr]"><div className="rounded-3xl bg-white p-8"><h2 className="text-2xl font-semibold text-forest">What to expect</h2><ul className="mt-6 grid gap-4">{expectations.map((x:string)=><li key={x} className="flex gap-3 text-sm leading-6 text-muted"><CheckCircle2 className="mt-1 shrink-0 text-forest" size={18}/>{x}</li>)}</ul></div><div className="rounded-3xl bg-[#e9eee5] p-8"><h2 className="text-xl font-semibold text-forest">Important information</h2><p className="mt-4 text-sm leading-7 text-muted">{full?.note||"Please contact AAGA to discuss suitability, precautions and current service details. Wellness services are not a substitute for medical diagnosis or treatment."}</p><p className="mt-5 text-xs leading-5 text-muted">This page is for general information only and does not provide medical advice, diagnosis or treatment.</p></div></div>
 </div>;
}
