import PhoneNumberValidator from "@/components/ToolsComponents/PhoneNumberValidator/PhoneNumberValidator";
import Head from "next/head";

export default function phoneNumberValidator() {
  return (
    <>
      <Head>
        <title>FindFoxs-Phone Number Validator</title>
      </Head>
      <PhoneNumberValidator />
    </>
  );
}
