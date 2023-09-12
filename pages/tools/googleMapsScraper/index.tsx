import Loading from "@/components/CustomComponents/Loading/Loading";
import Head from "next/head";
import { Suspense, lazy } from "react";
const GoogleMapsScraper = lazy(
  () =>
    import("@/components/ToolsComponents/GoogleMapsScraper/GoogleMapsScraper")
);

export default function googleMapsScraper() {
  return (
    <>
      <Head>
        <title>FindFoxs-Google Maps Scraper</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <GoogleMapsScraper />
      </Suspense>
    </>
  );
}
