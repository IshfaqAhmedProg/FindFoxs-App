import { ErrorHandlerProvider } from "@/contexts/ErrorHandlerContext";
import AuthLayout from "@/components/AuthComponents/AuthLayout";
import NewUserDetails from "@/components/AuthComponents/NewUserOnboarding/NewUserDetails";
import { useRouter } from "next/router";
export default function Onboarding() {
  const router = useRouter();
  const { onboarding } = router.query;
  return (
    <ErrorHandlerProvider>
      <AuthLayout>
        <NewUserDetails page={onboarding} />
      </AuthLayout>
    </ErrorHandlerProvider>
  );
}
