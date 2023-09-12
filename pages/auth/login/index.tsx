import React from "react";

import { ErrorHandlerProvider } from "@/contexts/ErrorHandlerContext";
import LoginForm from "@/components/AuthComponents/LoginForm";
import AuthLayout from "@/components/AuthComponents/AuthLayout";
import Head from "next/head";
export default function login() {
  return (
    <ErrorHandlerProvider>
      <Head>
        <title>FindFoxs-Login</title>
      </Head>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </ErrorHandlerProvider>
  );
}
