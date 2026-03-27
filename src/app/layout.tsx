import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "QurbanElite — Premium Qurban Livestock",
  description:
    "Experience the finest selection of premium livestock for your Qurban. Health-verified, ethically raised cows, goats, and sheep with Islamic values at the core.",
  keywords: [
    "qurban",
    "kurban",
    "livestock",
    "premium cattle",
    "halal",
    "eid al adha",
    "cow",
    "goat",
    "sheep",
    "qurban online",
    "hewan qurban",
    "sapi qurban",
    "kambing qurban",
  ],
  openGraph: {
    title: "QurbanElite — Premium Qurban Livestock",
    description:
      "Sacred quality, divine purpose. Premium livestock for your Qurban.",
    type: "website",
    locale: "id_ID",
    siteName: "QurbanElite",
  },
  twitter: {
    card: "summary_large_image",
    title: "QurbanElite — Premium Qurban Livestock",
    description:
      "Sacred quality, divine purpose. Premium livestock for your Qurban.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </body>
    </html>
  );
}