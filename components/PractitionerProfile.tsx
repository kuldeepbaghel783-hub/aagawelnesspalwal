import Image from "next/image";
import { practitioner } from "@/data/practitioner";

export default function PractitionerProfile() {
  return <section className="mt-16 rounded-[28px] bg-white p-7 shadow-soft md:p-10">
    <div className="grid items-center gap-8 md:grid-cols-[260px_1fr]">
      <div className="overflow-hidden rounded-[24px] bg-[#e9eee5]">
        <Image src={practitioner.image} alt={`Portrait of ${practitioner.name}`} width={520} height={650} className="h-[330px] w-full object-cover object-top"/>
      </div>
      <div>
        <p className="eyebrow">Meet the practitioner</p>
        <h2 className="mt-3 text-3xl font-semibold text-forest">{practitioner.name}</h2>
        <p className="mt-2 text-sm text-muted">{practitioner.centre} · {practitioner.location}</p>
        <p className="mt-5 max-w-2xl leading-8 text-muted">{practitioner.bio}</p>
      </div>
    </div>
  </section>;
}
