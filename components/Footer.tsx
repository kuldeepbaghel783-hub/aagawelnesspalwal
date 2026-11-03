import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { getSiteContent } from "@/lib/site-content";
export default async function Footer(){
 const site=await getSiteContent();const phone=site.brand.phone.replace(/\D/g,"");
 return <footer className="bg-[#103b2a] text-white"><div className="container-shell grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
  <div><div className="inline-block rounded-xl bg-white/5 px-2"><Image src="/aaga-logo.png" alt="AAGA Naturopathy and Wellness Center" width={220} height={83} className="h-[66px] w-[176px] object-contain"/></div><p className="mt-5 max-w-sm text-sm leading-7 text-white/70">{site.footer.tagline}</p></div>
  <div><h3 className="font-semibold">Explore</h3><div className="mt-4 grid gap-3 text-sm text-white/70"><Link href="/about">About AAGA</Link><Link href="/treatments">Treatments</Link><Link href="/wellness-library">Wellness Library</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy Policy</Link></div></div>
  <div><h3 className="font-semibold">Contact</h3><div className="mt-4 grid gap-4 text-sm text-white/70"><p className="flex gap-3"><MapPin size={18} className="shrink-0"/>{site.brand.address}</p><a className="flex gap-3" href={`tel:${site.brand.phone}`}><Phone size={18}/>+91 {site.brand.phone}</a>{site.brand.email&&<a className="flex gap-3" href={`mailto:${site.brand.email}`}><Mail size={18}/>{site.brand.email}</a>}<a className="flex gap-3" target="_blank" rel="noreferrer" href={`https://wa.me/${phone}`}><MessageCircle size={18}/>WhatsApp AAGA</a></div></div>
 </div><div className="border-t border-white/10 py-5 text-center text-xs text-white/50">© {new Date().getFullYear()} {site.brand.name}. All rights reserved.</div></footer>;
}
