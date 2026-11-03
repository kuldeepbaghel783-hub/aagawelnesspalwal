import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://aagawellness.com"),
  title: { default: "AAGA Wellness | Wellness Centre in Palwal", template: "%s | AAGA Wellness" },
  description: "Explore wellness services and request a consultation at AAGA Wellness Centre, Palwal, Haryana.",
  openGraph: { title: "AAGA Wellness", description: "Wellness consultations and services in Palwal.", type: "website" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header/><main>{children}</main><Footer/><WhatsAppButton/></body></html>;
}
