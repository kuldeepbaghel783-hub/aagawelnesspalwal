"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const res = await fetch("/api/admin/login", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email,password}) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sign in failed.");
      router.replace("/admin/dashboard"); router.refresh();
    } catch(err:any) { setError(err.message || "Unable to sign in."); }
    finally { setBusy(false); }
  }

  return <main className="container-shell grid min-h-[75vh] place-items-center py-16">
    <form onSubmit={submit} className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-soft">
      <p className="eyebrow">AAGA · Restricted area</p><h1 className="mt-3 text-3xl font-semibold text-forest">Admin sign in</h1>
      <p className="mt-2 text-sm leading-6 text-muted">Only authorised AAGA administrators can access enquiries.</p>
      <label className="form-label mt-7">Email<input className="form-input" type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
      <label className="form-label mt-4">Password<input className="form-input" type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      <button className="btn-primary mt-6 w-full" disabled={busy}>{busy ? "Signing in..." : "Sign in securely"}</button>
      <Link href="/" className="mt-5 block text-center text-sm text-muted underline">Back to website</Link>
    </form>
  </main>;
}
