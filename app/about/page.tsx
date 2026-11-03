import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";
export const metadata:Metadata={title:"About AAGA Wellness in Palwal",description:"Learn about AAGA Naturopathy and Wellness Center in Palwal."};
export const dynamic="force-dynamic";
export default async function About(){
 const site=await getSiteContent();
 return <div className="container-shell py-28">
  <p className="eyebrow">About AAGA</p><h1 className="section-title mt-4 max-w-3xl">{site.about.title}</h1>
  <div className="mt-12 grid items-center gap-12 md:grid-cols-2"><div className="relative min-h-[420px] overflow-hidden rounded-[28px]"><Image src={site.about.image} alt="AAGA clinic" fill unoptimized className="object-cover"/></div><div><h2 className="text-2xl font-semibold text-forest">Our approach</h2><p className="mt-5 leading-8 text-muted">{site.about.description}</p><p className="mt-4 leading-8 text-muted">We encourage visitors to ask questions, understand the services currently offered and discuss relevant precautions before deciding whether to proceed.</p></div></div>
  <section className="mt-20 grid items-center gap-10 rounded-[30px] bg-white p-7 shadow-soft md:grid-cols-[.8fr_1.2fr] md:p-10"><div className="relative h-[390px] overflow-hidden rounded-[24px] bg-[#e9eee5]"><Image src={site.practitioner.image} alt={site.practitioner.name} fill unoptimized className="object-cover object-top"/></div><div><p className="eyebrow">Meet the practitioner</p><h2 className="mt-4 text-4xl font-semibold tracking-tight text-forest">{site.practitioner.name}</h2><p className="mt-2 text-sm font-medium text-[#8d6c22]">{site.practitioner.title}</p><p className="mt-5 max-w-xl leading-8 text-muted">{site.practitioner.bio}</p>{site.practitioner.qualifications&&<p className="mt-4 text-sm text-forest"><strong>Qualifications:</strong> {site.practitioner.qualifications}</p>}<Link className="btn-primary mt-8" href="/contact">Contact AAGA</Link></div></section>
 </div>;
}
