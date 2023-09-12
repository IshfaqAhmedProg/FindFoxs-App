const EmailsAndContactsScraper = lazy(
  () =>
    import(
      "@/components/ToolsComponents/EmailsAndContactsScraper/EmailsAndContactsScraper"
    )
);
import Loading from "@/components/CustomComponents/Loading/Loading";
import Head from "next/head";
import { Suspense, lazy } from "react";

export default function emailAndContactsScraper() {
  return (
    <>
      <Head>
        <title>FindFoxs-Emails and Contacts Scraper</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <EmailsAndContactsScraper />
      </Suspense>
    </>
  );
}
