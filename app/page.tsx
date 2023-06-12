import { Metadata } from "next";
import { HeroSection } from "@/components/LandingComponents/HeroSection";
import styles from "@/styles/Home.module.css";
import FeaturesSection from "@/components/LandingComponents/FeaturesSection";
import ToolsSection from "@/components/LandingComponents/ToolsSection";
import FAQsection from "@/components/LandingComponents/FAQsection";
import GetInTouchSection from "@/components/LandingComponents/GetInTouchSection";
import Footer from "@/components/LandingComponents/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://scrapefox-crm.vercel.app"),
  title: "Scrapefoxs",
  description: "Best CRM and Leads Generator for marketing professionals!",
  icons: "favicon.ico",
  openGraph: {
    type: "website",
    url: "https://scrapefox-crm.vercel.app",
    title: "Scrapefoxs",
    description: "Best CRM and Leads Generator for marketing professionals!",
    siteName: "Scrapefoxs",
    images: [
      {
        url: "https://scrapefox-crm.vercel.app/Images/ogimage.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
    images: "https://scrapefox-crm.vercel.app/Images/ogimage.png",
  },
};
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7rem",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <HeroSection />
          <FeaturesSection />
          <ToolsSection />
          <FAQsection />
          <GetInTouchSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
