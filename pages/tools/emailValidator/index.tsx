import EmailValidator from "@/components/ToolsComponents/EmailValidator/EmailValidator";
import Head from "next/head";

export default function emailValidator() {
  return (
    <>
      <Head>
        <title>FindFoxs-Email Validator</title>
      </Head>
      <EmailValidator />
    </>
  );
}
