import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function TreatmentCard({ item }: { item: any }) {
  return <Link href={`/treatments/${item.slug}`} className="group overflow-hidden rounded-[26px] border border-forest/10 bg-white shadow-soft transition hover:-translate-y-1">
    <div className="image-cover h-52" style={{ backgroundImage: `url("${item.image}")` }} />
    <div className="p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-forest/60">{item.category}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-ink">{item.name}</h3>
        <ArrowUpRight className="shrink-0 text-forest transition group-hover:translate-x-1 group-hover:-translate-y-1"/>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{item.short}</p>
    </div>
  </Link>;
}
