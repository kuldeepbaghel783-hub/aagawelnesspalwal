import type { Metadata } from "next";
import TreatmentCard from "@/components/TreatmentCard";
import { getSiteContent } from "@/lib/site-content";
export const metadata:Metadata={title:"Wellness Treatments in Palwal",description:"Explore AAGA wellness services in Palwal."};
export const dynamic="force-dynamic";
export default async function Treatments(){
 const site=await getSiteContent();
 const items=site.treatments.filter((t:any)=>t.active);
 return <section className="container-shell py-28"><p className="eyebrow">Our services</p><h1 className="section-title mt-4 max-w-3xl">Explore the services available at AAGA.</h1><p className="mt-5 max-w-2xl leading-7 text-muted">Read about each service, understand important considerations and contact the team to confirm current availability.</p><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item:any)=><TreatmentCard key={item.slug} item={item}/>)}</div></section>;
}
