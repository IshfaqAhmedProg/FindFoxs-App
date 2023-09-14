import Head from "next/head";
import { Suspense, lazy } from "react";
import Loading from "@/components/CustomComponents/Loading/Loading";
const ManageLeads = lazy(
  () => import("@/components/ManageLeadsComponents/ManageLeads")
);
export default function index() {
  return (
    <>
      <Head>
        <title>FindFoxs-Manage your Leads</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <ManageLeads />
      </Suspense>
    </>
  );
}
