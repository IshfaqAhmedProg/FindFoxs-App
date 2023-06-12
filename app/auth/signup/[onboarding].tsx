import { AuthErrorProvider } from "@/contexts/AuthErrorContext";
import AuthLayout from "@/components/AuthComponents/AuthLayout";
import NewUserDetails from "@/components/AuthComponents/NewUserOnboarding/NewUserDetails";
import { useParams } from "next/navigation";
export default function Onboarding() {
  const { page } = useParams();
  return (
    <AuthErrorProvider>
      <AuthLayout>
        <NewUserDetails page={page} />
      </AuthLayout>
    </AuthErrorProvider>
  );
}
