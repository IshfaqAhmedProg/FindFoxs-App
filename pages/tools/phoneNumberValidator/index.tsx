import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import PhoneNumberValidator from "@/components/ToolsComponents/PhoneNumberValidator/PhoneNumberValidator";

export default function phoneNumberValidator() {
  return (
    <main className={styles.dashboard}>
      <DashboardLayout>
        <PhoneNumberValidator />
      </DashboardLayout>
    </main>
  );
}
