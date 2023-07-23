import FacebookScraper from "@/components/ToolsComponents/FacebookScraper/FacebookScraper";
import Head from "next/head";
import React from "react";

export default function facebookScraper() {
  return (
    <>
      <Head>
        <title>FindFoxs-Google Maps Scraper</title>
      </Head>
      <FacebookScraper />
    </>
  );
}
