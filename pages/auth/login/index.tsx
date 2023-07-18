import React from "react";

import { AuthErrorProvider } from "@/contexts/AuthErrorContext";
import LoginForm from "@/components/AuthComponents/LoginForm";
import AuthLayout from "@/components/AuthComponents/AuthLayout";
import Head from "next/head";
export default function login() {
  return (
    <AuthErrorProvider>
      <Head>
        <title>FindFoxs-Login</title>
      </Head>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </AuthErrorProvider>
  );
}
