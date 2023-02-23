import React from "react";

import { AuthLayoutProvider } from "@/components/AuthComponents/AuthLayout";
import SignupForm from "@/components/AuthComponents/SignupForm";
export default function login() {
  return (
    <AuthLayoutProvider>
      <SignupForm />
    </AuthLayoutProvider>
  );
}
