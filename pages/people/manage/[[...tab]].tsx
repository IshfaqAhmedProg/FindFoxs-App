import Head from "next/head";
import { Suspense, lazy } from "react";
import Loading from "@/components/CustomComponents/Loading/Loading";
const ManagePeople = lazy(
  () => import("@/components/ManagePeopleComponents/ManagePeople")
);
export default function index() {
  return (
    <>
      <Head>
        <title>FindFoxs-Manage People</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <ManagePeople />
      </Suspense>
    </>
  );
}
