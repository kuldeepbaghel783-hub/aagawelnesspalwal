import { MessageCircle } from "lucide-react";
export default function WhatsAppButton() {
  const message = encodeURIComponent("Hello AAGA Wellness, I would like to know more about your services and consultation availability.");
  return <a aria-label="Chat with AAGA on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#218653] text-white shadow-xl transition hover:scale-105" href={`https://wa.me/919729990924?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle size={25}/></a>;
}
