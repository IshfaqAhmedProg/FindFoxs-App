import Loading from "@/components/CustomComponents/Loading/Loading";
import Head from "next/head";
import { Suspense, lazy } from "react";
const EmailValidator = lazy(
  () => import("@/components/ToolsComponents/EmailValidator/EmailValidator")
);

export default function emailValidator() {
  return (
    <>
      <Head>
        <title>FindFoxs-Email Validator</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <EmailValidator />
      </Suspense>
    </>
  );
}
