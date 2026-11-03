import { treatments } from "@/data/treatments";

export const siteDefaults = {
  brand: {
    name: "AAGA Naturopathy and Wellness Center",
    logo: "/aaga-logo.png",
    phone: "9729990924",
    email: "",
    address: "Panchwati Chowk, opposite Maharana Pratap Dharmshala, Ekta Nagar, Kalra Colony, Palwal",
    cityLine: "Palwal, Haryana"
  },
  hero: {
    eyebrow: "NATUROPATHY · HOLISTIC WELLNESS · PALWAL",
    title: "A thoughtful approach to your wellbeing.",
    subtitle: "Explore naturopathy consultations and wellness therapies in a welcoming clinic environment. Speak with our team about services, suitability and appointment availability.",
    image: "/aaga-clinic-interior.jpg",
    primaryText: "Book a consultation",
    secondaryText: "Explore treatments"
  },
  about: {
    title: "Wellness conversations, grounded in care.",
    description: "AAGA Naturopathy and Wellness Center in Palwal offers a welcoming space to learn about naturopathy and wellness services. We encourage visitors to ask questions, understand suitability and make informed decisions.",
    image: "/aaga-opd.jpg"
  },
  practitioner: {
    name: "Garima Mahajan",
    title: "Naturopathy & Wellness Practitioner",
    bio: "Connect with Garima Mahajan at AAGA to learn about the centre's available wellness services and consultation process.",
    image: "/garima-mahajan.jpg",
    qualifications: ""
  },
  treatments: treatments.map(t => ({ slug:t.slug, name:t.name, short:t.short, category:t.category, image:t.image, active:true })),
  gallery: [
    { title:"AAGA clinic interior", image:"/aaga-clinic-interior.jpg", caption:"Our visitor waiting and reception area." },
    { title:"Consultation room", image:"/aaga-opd.jpg", caption:"A view of the clinic's OPD and consultation space." }
  ],
  footer: {
    tagline: "A welcoming space to explore naturopathy and wellness services in Palwal.",
    whatsappText: "Chat with AAGA"
  }
};
