import React from "react";

import { AuthErrorProvider } from "@/contexts/AuthErrorContext";
import SignupForm from "@/components/AuthComponents/SignupForm";
import AuthLayout from "@/components/AuthComponents/AuthLayout";
export default function login() {
  return (
    <AuthErrorProvider>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </AuthErrorProvider>
  );
}
