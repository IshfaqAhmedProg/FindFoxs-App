import React from "react";

import { AuthErrorProvider } from "@/contexts/AuthErrorContext";
import LoginForm from "@/components/AuthComponents/LoginForm";
import AuthLayout from "@/components/AuthComponents/AuthLayout";
export default function login() {
  return (
    <AuthErrorProvider>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </AuthErrorProvider>
  );
}
