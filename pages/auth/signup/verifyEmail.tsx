import AuthLayout from "@/components/AuthComponents/AuthLayout";
import VerifyEmail from "@/components/AuthComponents/NewUserOnboarding/NewUserDetails";
import { ErrorHandlerProvider } from "@/contexts/ErrorHandlerContext";

export default function Onboarding() {
  return (
    <ErrorHandlerProvider>
      <AuthLayout>
        <VerifyEmail />
      </AuthLayout>
    </ErrorHandlerProvider>
  );
}
