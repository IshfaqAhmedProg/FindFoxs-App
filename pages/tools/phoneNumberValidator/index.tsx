import Loading from "@/components/CustomComponents/Loading/Loading";
import Head from "next/head";
import { Suspense, lazy } from "react";
const PhoneNumberValidator = lazy(
  () =>
    import(
      "@/components/ToolsComponents/PhoneNumberValidator/PhoneNumberValidator"
    )
);
export default function phoneNumberValidator() {
  return (
    <>
      <Head>
        <title>FindFoxs-Phone Number Validator</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <PhoneNumberValidator />
      </Suspense>
    </>
  );
}
