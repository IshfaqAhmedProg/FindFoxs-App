import SearchLeadsTable from "@/components/SearchLeadsComponents/SearchLeadsTable";
import Head from "next/head";
export default function SearchLeadsPage() {
  const fetchSize = 10;
  return (
    <>
      <Head>
        <title>FindFoxs-Search Leads</title>
      </Head>
      <SearchLeadsTable />
    </>
  );
}
