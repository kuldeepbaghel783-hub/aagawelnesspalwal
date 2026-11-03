"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function AppointmentForm({ whatsappNumber = "9729990924" }: { whatsappNumber?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Naturopathy Consultation");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(""); setSuccess(false);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, preferredTime, message })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to submit your enquiry.");
      setSuccess(true);
      const text = `Hello AAGA Wellness. My name is ${name}. My phone number is ${phone}. I am interested in ${service}.${preferredTime ? ` Preferred time: ${preferredTime}.` : ""}${message ? ` Message: ${message}` : ""} I have submitted an enquiry through the website.`;
      window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setName(""); setPhone(""); setPreferredTime(""); setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please contact AAGA on WhatsApp.");
    } finally { setBusy(false); }
  }

  return <form onSubmit={submit} className="grid gap-4">
    <label className="form-label">Your name<input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" required minLength={2} maxLength={80}/></label>
    <label className="form-label">Mobile number<input className="form-input" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Enter your mobile number" required maxLength={16}/></label>
    <label className="form-label">Interested in<select className="form-input" value={service} onChange={e=>setService(e.target.value)}>
      {["Hijama Therapy","Deep Tissue Massage","Shirodhara","Steam Therapy","Yoga Therapy","Naturopathy Consultation","Weight Management","Other therapies"].map(s=><option key={s}>{s}</option>)}
    </select></label>
    <label className="form-label">Preferred time (optional)<input className="form-input" value={preferredTime} onChange={e=>setPreferredTime(e.target.value)} placeholder="e.g. Morning / Afternoon" maxLength={80}/></label>
    <label className="form-label">Message (optional)<textarea className="form-input min-h-24" value={message} onChange={e=>setMessage(e.target.value)} placeholder="What would you like to ask?" maxLength={500}/></label>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    {success && <p role="status" className="flex items-center gap-2 text-sm text-green-700"><CheckCircle2 size={17}/> Enquiry received. WhatsApp is opening for follow-up.</p>}
    <button className="btn-primary w-full disabled:opacity-60" type="submit" disabled={busy}>{busy ? "Submitting..." : "Submit enquiry & continue to WhatsApp"} <Send size={16}/></button>
    <p className="text-xs leading-5 text-muted">Your enquiry is sent to AAGA for follow-up. Please do not include sensitive medical information in this form. Submitting an enquiry does not confirm an appointment.</p>
  </form>;
}
