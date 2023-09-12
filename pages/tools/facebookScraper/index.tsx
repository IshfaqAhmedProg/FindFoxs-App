const FacebookScraper = lazy(
  () => import("@/components/ToolsComponents/FacebookScraper/FacebookScraper")
);
import Loading from "@/components/CustomComponents/Loading/Loading";
import Head from "next/head";
import { Suspense, lazy } from "react";

export default function facebookScraper() {
  return (
    <>
      <Head>
        <title>FindFoxs-Google Maps Scraper</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <FacebookScraper />
      </Suspense>
    </>
  );
}
