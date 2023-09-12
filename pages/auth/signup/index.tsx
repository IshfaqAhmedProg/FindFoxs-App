import React from "react";

import { ErrorHandlerProvider } from "@/contexts/ErrorHandlerContext";
import SignupForm from "@/components/AuthComponents/SignupForm";
import AuthLayout from "@/components/AuthComponents/AuthLayout";
export default function login() {
  return (
    <ErrorHandlerProvider>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </ErrorHandlerProvider>
  );
}
