import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";
import { getSiteContent } from "@/lib/site-content";
export const metadata:Metadata={title:"Contact AAGA Wellness in Palwal",description:"Contact AAGA Wellness Centre in Palwal to ask about services and request a consultation."};
export const dynamic="force-dynamic";
export default async function Contact(){
 const site=await getSiteContent();
 const address=site.brand.address;
 const phone=site.brand.phone;
 const map="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(address);
 return <section className="container-shell py-28"><p className="eyebrow">Contact AAGA</p><h1 className="section-title mt-4 max-w-2xl">Let's start with a conversation.</h1><p className="mt-5 max-w-xl leading-7 text-muted">Ask about services, current availability and consultation details. Your enquiry is saved for the AAGA team and you can continue the conversation on WhatsApp.</p>
  <div className="mt-12 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
   <div className="rounded-[28px] bg-forest p-8 text-white"><h2 className="text-2xl font-semibold">Visit or contact us</h2><div className="mt-8 grid gap-7 text-sm leading-7 text-white/75"><p className="flex gap-4"><MapPin className="shrink-0 text-sage"/>{address}</p><a className="flex gap-4" href={`tel:${phone}`}><Phone className="shrink-0 text-sage"/>+91 {phone}</a>{site.brand.email&&<a className="flex gap-4" href={`mailto:${site.brand.email}`}><Mail className="shrink-0 text-sage"/>{site.brand.email}</a>}</div><a className="mt-9 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest" href={map} target="_blank" rel="noreferrer">Get directions</a><div className="mt-8 overflow-hidden rounded-2xl"><iframe title="Map showing AAGA Wellness area" src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} width="100%" height="230" loading="lazy" className="border-0"/></div></div>
   <div className="rounded-[28px] bg-white p-8 shadow-soft"><h2 className="text-2xl font-semibold text-forest">Request a consultation</h2><p className="mb-7 mt-2 text-sm text-muted">Share your name and the service you would like to ask about.</p><AppointmentForm whatsappNumber={phone}/></div>
  </div>
 </section>;
}
