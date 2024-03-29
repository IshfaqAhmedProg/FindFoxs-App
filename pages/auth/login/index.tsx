import AuthLayout from "@/components/AuthComponents/AuthLayout";
import LoginForm from "@/components/AuthComponents/LoginForm";
import { ErrorHandlerProvider } from "@/contexts/ErrorHandlerContext";
export default function login() {
  return (
    <ErrorHandlerProvider>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </ErrorHandlerProvider>
  );
}
