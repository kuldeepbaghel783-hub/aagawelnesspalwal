"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, CalendarDays } from "lucide-react";

const links=[["Home","/"],["About","/about"],["Treatments","/treatments"],["Wellness Library","/wellness-library"],["Gallery","/#gallery"],["Contact","/contact"]];
export default function Header(){
 const [open,setOpen]=useState(false);
 const [brand,setBrand]=useState({logo:"/aaga-logo.png",phone:"9729990924",cityLine:"Palwal, Haryana"});
 useEffect(()=>{fetch("/api/site-content").then(r=>r.json()).then(d=>{if(d.content?.brand)setBrand(d.content.brand)}).catch(()=>{});},[]);
 return <header className="relative z-50">
  <div className="bg-[#103b2a] text-white"><div className="container-shell flex min-h-9 flex-wrap items-center justify-between gap-2 py-2 text-[11px] text-white/85"><span className="flex items-center gap-2"><MapPin size={13}/> {brand.cityLine}</span><a href={`tel:${brand.phone}`} className="flex items-center gap-2"><Phone size={13}/> +91 {brand.phone}</a></div></div>
  <div className="container-shell py-3"><div className="flex h-[76px] items-center justify-between gap-4 rounded-2xl border border-white/70 bg-[#fffef9]/95 px-4 shadow-[0_12px_45px_rgba(18,48,33,.12)] backdrop-blur-xl sm:px-7">
   <Link href="/" className="shrink-0" aria-label="AAGA home"><Image src={brand.logo} alt="AAGA Naturopathy and Wellness Center" width={220} height={83} priority className="h-[58px] w-[150px] object-contain sm:h-[64px] sm:w-[190px]"/></Link>
   <nav className="hidden items-center gap-5 xl:flex">{links.map(([label,href])=><Link key={href} href={href} className="text-[13px] font-semibold text-[#34483b] transition hover:text-[#a77e24]">{label}</Link>)}<Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#174b34] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#0c3826]"><CalendarDays size={15}/> Book a consultation</Link></nav>
   <button className="rounded-xl p-2 text-[#174b34] xl:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  </div>
  {open&&<nav className="container-shell mt-2 rounded-2xl border border-white/70 bg-[#fffef9] p-4 shadow-xl xl:hidden">{links.map(([label,href])=><Link key={href} onClick={()=>setOpen(false)} href={href} className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#34483b] hover:bg-[#eef2e9]">{label}</Link>)}<Link onClick={()=>setOpen(false)} href="/contact" className="mt-2 block rounded-full bg-[#174b34] px-4 py-3 text-center text-sm font-bold text-white">Book a consultation</Link></nav>}
  </div>
 </header>;
}
