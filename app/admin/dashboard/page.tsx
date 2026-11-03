"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, FileText, Stethoscope, UserRound, Images, Settings, LogOut, RefreshCw, Save, MessageCircle, Phone, Plus, Trash2, ExternalLink } from "lucide-react";

type Content = {
 brand:{name:string;logo:string;phone:string;email:string;address:string;cityLine:string};
 hero:{eyebrow:string;title:string;subtitle:string;image:string;primaryText:string;secondaryText:string};
 about:{title:string;description:string;image:string};
 practitioner:{name:string;title:string;bio:string;image:string;qualifications:string};
 treatments:{slug:string;name:string;short:string;category:string;image:string;active:boolean}[];
 gallery:{title:string;image:string;caption:string}[];
 footer:{tagline:string;whatsappText:string};
};
type Enquiry={_id:string;name:string;phone:string;service:string;preferredTime?:string;message?:string;status:string;createdAt:string};
const nav=[["overview","Overview",LayoutDashboard],["hero","Hero section",FileText],["about","About & clinic",Images],["practitioner","Practitioner",UserRound],["treatments","Treatments",Stethoscope],["gallery","Gallery",Images],["contact","Contact & footer",Settings],["enquiries","Enquiries",MessageCircle]] as const;

export default function AdminDashboard(){
 const router=useRouter();
 const [tab,setTab]=useState("overview");
 const [content,setContent]=useState<Content|null>(null);
 const [enquiries,setEnquiries]=useState<Enquiry[]>([]);
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState(false);
 const [notice,setNotice]=useState("");
 const [error,setError]=useState("");
 const [email,setEmail]=useState("");

 async function load(){
  setLoading(true);setError("");
  try{
   const [c,e,s]=await Promise.all([
    fetch("/api/site-content",{cache:"no-store"}),
    fetch("/api/admin/enquiries",{cache:"no-store"}),
    fetch("/api/admin/session",{cache:"no-store"})
   ]);
   if(s.status===401||e.status===401){router.replace("/admin/login");return;}
   const cd=await c.json(),ed=await e.json(),sd=await s.json();
   setContent(cd.content);setEnquiries(ed.enquiries||[]);setEmail(sd.email||"");
  }catch{setError("Could not load dashboard data. Check your database connection.");}
  finally{setLoading(false);}
 }
 useEffect(()=>{load();},[]);
 function update(section:keyof Content,key:string,value:any){
  setContent(old=>old?({...old,[section]:{...(old[section] as any),[key]:value}}):old);
 }
 async function save(){
  if(!content)return;setSaving(true);setNotice("");setError("");
  try{
   const res=await fetch("/api/site-content",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(content)});
   const data=await res.json();if(!res.ok)throw new Error(data.message||"Save failed");
   setNotice("Changes saved. Refresh the public website to see updates.");
  }catch(e:any){setError(e.message||"Unable to save.");}
  finally{setSaving(false);}
 }
 async function updateStatus(id:string,status:string){
  const res=await fetch("/api/admin/enquiries",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})});
  if(!res.ok){setError("Could not update enquiry status.");return;}
  setEnquiries(old=>old.map(x=>x._id===id?{...x,status}:x));
 }
 async function logout(){
  await fetch("/api/admin/logout",{method:"POST"});router.replace("/admin/login");router.refresh();
 }
 function field(label:string,value:string,onChange:(v:string)=>void,help?:string){
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span><input className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" value={value||""} onChange={e=>onChange(e.target.value)}/>{help&&<span className="mt-1 block text-xs text-slate-400">{help}</span>}</label>;
 }
 function area(label:string,value:string,onChange:(v:string)=>void){
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span><textarea rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" value={value||""} onChange={e=>onChange(e.target.value)}/></label>;
 }
 const card="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";
 if(loading||!content)return <div className="grid min-h-screen place-items-center bg-[#f4f6f2] text-slate-500">{error||"Loading AAGA admin..."}</div>;
 const newCount=enquiries.filter(e=>e.status==="new").length;
 return <div className="min-h-screen bg-[#f4f6f2] text-slate-800">
  <div className="flex min-h-screen">
   <aside className="hidden w-[260px] shrink-0 flex-col bg-[#073b2d] text-white lg:flex">
    <div className="border-b border-white/10 px-6 py-6"><div className="inline-flex rounded-xl bg-white px-3 py-2"><Image src="/aaga-logo.png" alt="AAGA" width={145} height={54} className="h-11 w-auto object-contain"/></div><p className="mt-3 text-xs tracking-wide text-emerald-100/70">WEBSITE MANAGEMENT</p></div>
    <nav className="flex-1 space-y-1 px-3 py-5">{nav.map(([id,label,Icon])=><button key={id} onClick={()=>setTab(id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${tab===id?"bg-emerald-700 text-white shadow":"text-emerald-50/75 hover:bg-white/10"}`}><Icon size={17}/>{label}{id==="enquiries"&&newCount>0&&<span className="ml-auto rounded-full bg-amber-300 px-2 py-0.5 text-xs font-bold text-emerald-950">{newCount}</span>}</button>)}</nav>
    <div className="border-t border-white/10 p-4"><div className="mb-3 truncate text-xs text-emerald-100/70">{email}</div><button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/10"><LogOut size={17}/> Logout</button></div>
   </aside>
   <main className="min-w-0 flex-1">
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
     <div><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800">AAGA · Admin</p><h1 className="mt-1 text-xl font-bold text-slate-900">{nav.find(x=>x[0]===tab)?.[1]||"Dashboard"}</h1></div>
     <div className="flex items-center gap-2"><a href="/" target="_blank" className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm sm:flex">View website <ExternalLink size={15}/></a><button onClick={load} className="rounded-xl border border-slate-200 p-2.5" title="Refresh"><RefreshCw size={16}/></button><button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-xl bg-[#07543b] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Save size={16}/>{saving?"Saving...":"Save changes"}</button><button onClick={logout} className="rounded-xl border border-slate-200 p-2.5 lg:hidden"><LogOut size={16}/></button></div>
    </header>
    <div className="border-b border-slate-200 bg-white px-4 py-2 lg:hidden"><div className="flex gap-2 overflow-x-auto">{nav.map(([id,label])=><button key={id} onClick={()=>setTab(id)} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs ${tab===id?"bg-emerald-800 text-white":"bg-slate-100"}`}>{label}</button>)}</div></div>
    <div className="mx-auto max-w-[1200px] space-y-6 p-5 md:p-8">
     {notice&&<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</div>}
     {error&&<div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
     {tab==="overview"&&<><div><h2 className="text-2xl font-bold">Welcome to your website control room</h2><p className="mt-1 text-sm text-slate-500">Manage AAGA's public website content and respond to enquiries.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{l:"Total enquiries",v:enquiries.length},{l:"New enquiries",v:newCount},{l:"Booked",v:enquiries.filter(e=>e.status==="booked").length},{l:"Closed",v:enquiries.filter(e=>e.status==="closed").length}].map(x=><div className={card} key={x.l}><p className="text-sm text-slate-500">{x.l}</p><p className="mt-2 text-3xl font-bold text-[#07543b]">{x.v}</p></div>)}</div><div className={card}><h3 className="font-bold">Quick actions</h3><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{nav.slice(1,7).map(([id,label,Icon])=><button key={id} onClick={()=>setTab(id)} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left hover:border-emerald-700 hover:bg-emerald-50"><Icon className="text-emerald-800"/><span className="text-sm font-semibold">{label}</span></button>)}</div></div><div className={card}><h3 className="font-bold">Public website preview</h3><p className="mt-2 text-sm text-slate-500">Your clinic website is separate from this private management area.</p><a href="/" target="_blank" className="mt-4 inline-flex rounded-full bg-emerald-800 px-5 py-3 text-sm text-white">Open AAGA website</a></div></>}
     {tab==="hero"&&<div className={card}><h2 className="text-lg font-bold">Homepage hero section</h2><p className="mb-5 mt-1 text-sm text-slate-500">Update the first message visitors see on the homepage.</p><div className="grid gap-4 md:grid-cols-2">{field("Eyebrow",content.hero.eyebrow,v=>update("hero","eyebrow",v))}{field("Main heading",content.hero.title,v=>update("hero","title",v))}{area("Supporting text",content.hero.subtitle,v=>update("hero","subtitle",v))}{field("Hero image path or URL",content.hero.image,v=>update("hero","image",v),"Use /aaga-clinic-interior.jpg for an uploaded file in public/ or paste a full HTTPS image URL.")}{field("Primary button text",content.hero.primaryText,v=>update("hero","primaryText",v))}{field("Secondary button text",content.hero.secondaryText,v=>update("hero","secondaryText",v))}</div><div className="mt-5 overflow-hidden rounded-xl"><img src={content.hero.image} alt="Hero preview" className="h-48 w-full object-cover"/></div></div>}
     {tab==="about"&&<div className={card}><h2 className="text-lg font-bold">About AAGA & clinic information</h2><div className="mt-5 grid gap-4">{field("About heading",content.about.title,v=>update("about","title",v))}{area("About description",content.about.description,v=>update("about","description",v))}{field("About image path or URL",content.about.image,v=>update("about","image",v))}</div></div>}
     {tab==="practitioner"&&<div className={card}><h2 className="text-lg font-bold">Practitioner profile</h2><p className="mt-1 text-sm text-slate-500">Only publish qualifications after AAGA verifies the exact details.</p><div className="mt-5 grid gap-4 md:grid-cols-2">{field("Practitioner name",content.practitioner.name,v=>update("practitioner","name",v))}{field("Public title",content.practitioner.title,v=>update("practitioner","title",v))}{field("Profile image path or URL",content.practitioner.image,v=>update("practitioner","image",v))}{field("Qualifications / credentials (verified only)",content.practitioner.qualifications,v=>update("practitioner","qualifications",v))}{area("Biography",content.practitioner.bio,v=>update("practitioner","bio",v))}</div></div>}
     {tab==="treatments"&&<div className={card}><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold">Manage treatments</h2><p className="text-sm text-slate-500">Edit service names, descriptions, images and visibility.</p></div><button onClick={()=>setContent(old=>old?({...old,treatments:[...old.treatments,{slug:`new-service-${Date.now()}`,name:"New service",short:"Add a short description",category:"Wellness service",image:"/aaga-clinic-interior.jpg",active:true}]}):old)} className="rounded-xl bg-emerald-800 px-4 py-2.5 text-sm text-white"><Plus size={15} className="mr-1 inline"/> Add treatment</button></div><div className="mt-5 space-y-4">{content.treatments.map((t,i)=><div key={t.slug} className="grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-[1fr_1fr]"><div className="flex items-center justify-between md:col-span-2"><strong>{i+1}. {t.name}</strong><div className="flex items-center gap-3"><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={t.active} onChange={e=>setContent(old=>old?({...old,treatments:old.treatments.map((x,j)=>j===i?{...x,active:e.target.checked}:x)}):old)}/> Published</label><button onClick={()=>setContent(old=>old?({...old,treatments:old.treatments.filter((_,j)=>j!==i)}):old)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16}/></button></div></div>{field("Treatment name",t.name,v=>setContent(old=>old?({...old,treatments:old.treatments.map((x,j)=>j===i?{...x,name:v,slug:x.slug}:x)}):old))}{field("Category",t.category,v=>setContent(old=>old?({...old,treatments:old.treatments.map((x,j)=>j===i?{...x,category:v}:x)}):old))}{area("Description",t.short,v=>setContent(old=>old?({...old,treatments:old.treatments.map((x,j)=>j===i?{...x,short:v}:x)}):old))}{field("Image path or URL",t.image,v=>setContent(old=>old?({...old,treatments:old.treatments.map((x,j)=>j===i?{...x,image:v}:x)}):old))}</div>)}</div></div>}
     {tab==="gallery"&&<div className={card}><div className="flex items-center justify-between"><h2 className="text-lg font-bold">Clinic gallery</h2><button onClick={()=>setContent(old=>old?({...old,gallery:[...old.gallery,{title:"New clinic photo",image:"/aaga-clinic-interior.jpg",caption:"Add a caption"}]}):old)} className="rounded-xl bg-emerald-800 px-4 py-2 text-sm text-white"><Plus size={15} className="mr-1 inline"/> Add photo</button></div><p className="mt-1 text-sm text-slate-500">Use local public/ paths or hosted HTTPS image URLs.</p><div className="mt-5 grid gap-4 md:grid-cols-2">{content.gallery.map((g,i)=><div key={i} className="rounded-xl border border-slate-200 p-4"><img src={g.image} alt={g.title} className="mb-3 h-36 w-full rounded-lg object-cover"/>{field("Photo title",g.title,v=>setContent(old=>old?({...old,gallery:old.gallery.map((x,j)=>j===i?{...x,title:v}:x)}):old))}<div className="mt-3">{field("Image path or URL",g.image,v=>setContent(old=>old?({...old,gallery:old.gallery.map((x,j)=>j===i?{...x,image:v}:x)}):old))}</div><div className="mt-3">{field("Caption",g.caption,v=>setContent(old=>old?({...old,gallery:old.gallery.map((x,j)=>j===i?{...x,caption:v}:x)}):old))}</div><button onClick={()=>setContent(old=>old?({...old,gallery:old.gallery.filter((_,j)=>j!==i)}):old)} className="mt-3 text-sm text-red-600">Remove photo</button></div>)}</div></div>}
     {tab==="contact"&&<div className={card}><h2 className="text-lg font-bold">Business contact & footer</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{field("Business name",content.brand.name,v=>update("brand","name",v))}{field("Logo path or URL",content.brand.logo,v=>update("brand","logo",v),"Transparent PNG or SVG recommended.")}{field("WhatsApp / phone number",content.brand.phone,v=>update("brand","phone",v))}{field("Public email",content.brand.email,v=>update("brand","email",v))}{field("City line",content.brand.cityLine,v=>update("brand","cityLine",v))}{area("Full address",content.brand.address,v=>update("brand","address",v))}{area("Footer tagline",content.footer.tagline,v=>update("footer","tagline",v))}</div></div>}
     {tab==="enquiries"&&<div className={card}><div className="flex items-center justify-between"><h2 className="text-lg font-bold">Website enquiries</h2><span className="text-xs text-slate-500">{enquiries.length} total</span></div>{enquiries.length===0?<p className="py-10 text-sm text-slate-500">No enquiries received yet.</p>:<div className="mt-4 divide-y divide-slate-100">{enquiries.map(e=><div key={e._id} className="grid gap-3 py-4 md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-center"><div><strong>{e.name}</strong><p className="text-sm text-slate-500">{e.service} · {new Date(e.createdAt).toLocaleString("en-IN")}</p>{e.message&&<p className="mt-1 text-xs text-slate-500">{e.message}</p>}</div><div className="flex gap-3 text-sm"><a href={`tel:${e.phone}`} className="flex items-center gap-1 text-emerald-800"><Phone size={14}/>{e.phone}</a><a target="_blank" rel="noreferrer" href={`https://wa.me/${e.phone.replace(/\D/g,"")}`} className="text-emerald-800"><MessageCircle size={14}/> WhatsApp</a></div><p className="text-xs text-slate-500">Preferred: {e.preferredTime||"Not specified"}</p><select className="rounded-lg border border-slate-200 p-2 text-sm" value={e.status} onChange={ev=>updateStatus(e._id,ev.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="booked">Booked</option><option value="closed">Closed</option></select></div>)}</div>}</div>}
    </div>
   </main>
  </div>
 </div>;
}
