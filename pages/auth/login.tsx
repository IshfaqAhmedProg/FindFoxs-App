import React from "react";

import { AuthLayoutProvider } from "@/components/AuthComponents/AuthLayout";
import LoginForm from "@/components/AuthComponents/LoginForm";
export default function login() {
  return (
    <AuthLayoutProvider>
      <LoginForm />
    </AuthLayoutProvider>
  );
}
