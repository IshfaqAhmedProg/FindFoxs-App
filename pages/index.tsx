import Head from "next/head";
import Link from "next/link";
import { Hero } from "@/components/LandingComponents/Hero";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Scrapefox CRM</title>
        <meta
          name="description"
          content="Best CRM for marketing professionals!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Hero text="Home" />
      </main>
    </>
  );
}
