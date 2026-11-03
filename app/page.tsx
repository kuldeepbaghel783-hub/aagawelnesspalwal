import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, MapPin, HeartHandshake, Sparkles } from "lucide-react";
import TreatmentCard from "@/components/TreatmentCard";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const site = await getSiteContent();
  const visibleTreatments = site.treatments.filter((item:any)=>item.active);
  return <>

    <section className="aaga-hero relative isolate overflow-hidden">
      <div className="aaga-botanical aaga-botanical-left" aria-hidden="true"/>
      <div className="aaga-botanical aaga-botanical-right" aria-hidden="true"/>
      <div className="container-shell relative z-10 grid min-h-[590px] items-center gap-12 py-20 lg:grid-cols-[1.04fr_.96fr] lg:py-24">
        <div className="max-w-[620px]">
          <p className="eyebrow flex items-center gap-2">{site.hero.eyebrow} <Leaf size={14}/></p>
          <h1 className="mt-7 max-w-[620px] text-[clamp(3.1rem,5.2vw,5.15rem)] font-semibold leading-[1.02] tracking-[-.055em] text-[#214b38]">
            {site.hero.title.split("wellbeing")[0]}
            {site.hero.title.toLowerCase().includes("wellbeing") ? <><em className="font-serif font-normal tracking-[-.04em]">wellbeing.</em></> : null}
          </h1>
          <p className="mt-7 max-w-[570px] text-[15px] leading-8 text-[#65736a] md:text-base">{site.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-[#214f39] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#143b29]">{site.hero.primaryText}<ArrowRight size={17}/></Link>
            <Link href="/treatments" className="inline-flex items-center gap-3 rounded-full border border-[#9eaf9f] px-6 py-3.5 text-sm font-semibold text-[#28533d] transition hover:bg-white/70">{site.hero.secondaryText}</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-[#63766a]">
           
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[510px] lg:mr-0">
          <div className="aaga-hero-photo relative h-[390px] overflow-hidden rounded-t-[190px] rounded-b-[30px] shadow-[0_25px_65px_rgba(54,75,53,.16)] sm:h-[455px]">
            <Image src={site.hero.image || "/aaga-clinic-interior.jpg"} alt="A welcoming space at AAGA Wellness Centre" fill priority unoptimized className="object-cover object-center"/>
          </div>
          <div className="absolute -bottom-5 -left-5 max-w-[220px] rounded-2xl border border-white/80 bg-white/95 p-5 shadow-[0_15px_45px_rgba(38,62,44,.14)] backdrop-blur">
            <Leaf size={20} className="text-[#28553d]"/>
            <p className="mt-3 text-sm font-bold text-[#234b37]">A welcoming space for wellness</p>
            <p className="mt-1 text-xs leading-5 text-[#718077]">Ask questions and understand your options before booking.</p>
          </div>
        </div>
      </div>
      <div className="aaga-hero-wave" aria-hidden="true"/>
    </section>

    <section className="border-b border-[#e8e5d9] bg-[#f8f7f0] py-8">
      <div className="container-shell grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
        {[["Drug-free guidance","Learn about natural wellness options"],["Lifestyle conversations","Discuss practical daily habits"],["Preventive wellbeing","Understand healthy routines"],["Personal attention","Ask questions at your own pace"]].map(([a,b],i)=><div key={a} className="flex flex-col items-center gap-2"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#e7eddf] text-[#28553d]">{[<Leaf key="a"/>,<Sparkles key="b"/>,<ShieldCheck key="c"/>,<HeartHandshake key="d"/>][i]}</span><h3 className="font-semibold text-[#193e2d]">{a}</h3><p className="text-xs text-slate-500">{b}</p></div>)}
      </div>
    </section>

    <section className="container-shell py-24">
      <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Explore AAGA</p><h2 className="section-title mt-4">Holistic wellness services</h2><p className="mt-5 leading-7 text-muted">Explore the services available at AAGA and contact our team to discuss suitability, precautions and appointment availability.</p></div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visibleTreatments.slice(0,6).map((item:any)=><TreatmentCard key={item.slug} item={item}/>)}</div>
      <div className="mt-10 text-center"><Link href="/treatments" className="btn-secondary">Explore all treatments <ArrowRight size={16}/></Link></div>
    </section>

    <section className="bg-white py-24">
      <div className="container-shell grid items-center gap-12 md:grid-cols-2">
        <div className="relative min-h-[440px] overflow-hidden rounded-[32px]"><Image src={site.about.image || "/aaga-opd.jpg"} alt="AAGA consultation room" fill unoptimized className="object-cover"/></div>
        <div><p className="eyebrow">A personal conversation</p><h2 className="section-title mt-4">{site.about.title}</h2><p className="mt-6 leading-8 text-muted">{site.about.description}</p><ul className="mt-7 grid gap-4 text-sm text-ink/80"><li className="flex gap-3"><ShieldCheck className="text-forest"/> Clear information about services and limitations</li><li className="flex gap-3"><ShieldCheck className="text-forest"/> Opportunity to discuss suitability and precautions</li><li className="flex gap-3"><ShieldCheck className="text-forest"/> Direct contact with the AAGA team</li></ul><Link href="/about" className="btn-primary mt-9">Get to know AAGA <ArrowRight size={16}/></Link></div>
      </div>
    </section>

    <section id="gallery" className="bg-[#eef1e8] py-24">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Inside AAGA</p><h2 className="section-title mt-4">A look inside our centre.</h2><p className="mt-5 leading-7 text-muted">Real photographs of our clinic in Palwal, so you know what to expect when you visit.</p></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">{site.gallery.map((g:any,i:number)=><div key={i} className="overflow-hidden rounded-[28px] bg-white shadow-soft"><div className="relative h-[320px]"><Image src={g.image} alt={g.title} fill unoptimized className="object-cover transition duration-700 hover:scale-105"/></div><div className="p-5"><p className="font-semibold text-forest">{g.title}</p><p className="mt-1 text-sm text-muted">{g.caption}</p></div></div>)}</div>
      </div>
    </section>

    <section className="container-shell py-24"><div className="rounded-[32px] bg-[#123d2c] px-7 py-14 text-center text-white md:px-16"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e9c66e]">Your next step</p><h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl md:text-5xl">A healthier conversation starts here.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-white/75">Contact AAGA to ask about services, suitability and consultation availability.</p><Link href="/contact" className="mt-8 inline-flex rounded-full bg-[#e9c66e] px-7 py-4 text-sm font-bold text-[#183b2b]">Book a consultation <ArrowRight size={16}/></Link></div></section>
  </>;
}
