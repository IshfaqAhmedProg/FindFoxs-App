import Head from "next/head";
import { HeroSection } from "@/components/LandingComponents/HeroSection";
import styles from "@/styles/Home.module.css";
import FeaturesSection from "@/components/LandingComponents/FeaturesSection";
import { Stack } from "@mui/material";
import ToolsSection from "@/components/LandingComponents/ToolsSection";
import FAQsection from "@/components/LandingComponents/FAQsection";
import GetInTouchSection from "@/components/LandingComponents/GetInTouchSection";
import Footer from "@/components/LandingComponents/Footer";
import Cursor from "@/components/LandingComponents/Cursor";

export default function Home() {
  return (
    <>
      <Head>
        <title>Scrapefox</title>
        <meta
          name="description"
          content="Best CRM and Leads Generator for marketing professionals!"
        />

        <meta property="og:url" content="https://scrapefox-crm.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Scrapefox" />
        <meta
          property="og:description"
          content="Best CRM and Leads Generator for marketing professionals!"
        />
        <meta
          property="og:image"
          content="https://scrapefox-crm.vercel.app/Images/ogimage.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="scrapefox-crm.vercel.app" />
        <meta
          property="twitter:url"
          content="https://scrapefox-crm.vercel.app"
        />
        <meta name="twitter:title" content="Scrapefox" />
        <meta
          name="twitter:description"
          content="Best CRM and Leads Generator for marketing professionals!"
        />
        <meta
          name="twitter:image"
          content="https://scrapefox-crm.vercel.app/Images/ogimage.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Cursor />
      <main className={styles.main}>
        <Stack
          gap="5rem"
          justifyContent="flex-start"
          alignItems="center"
          width="100%"
        >
          <HeroSection />
          <FeaturesSection />
          <ToolsSection />
          <FAQsection />
          <GetInTouchSection />
          <Footer />
        </Stack>
       
      </main>
    </>
  );
}
