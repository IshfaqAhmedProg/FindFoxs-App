import { AuthErrorProvider } from "@/contexts/AuthErrorContext";
import AuthLayout from "@/components/AuthComponents/AuthLayout";
import NewUserDetails from "@/components/AuthComponents/NewUserOnboarding/NewUserDetails";
import { useRouter } from "next/router";
export default function Onboarding() {
  const router = useRouter();
  const { onboarding } = router.query;
  return (
    <AuthErrorProvider>
      <AuthLayout>
        <NewUserDetails page={onboarding} />
      </AuthLayout>
    </AuthErrorProvider>
  );
}
