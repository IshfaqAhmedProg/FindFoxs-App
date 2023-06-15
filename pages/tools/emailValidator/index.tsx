import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import EmailValidator from "@/components/ToolsComponents/EmailValidator/EmailValidator";

export default function emailValidator() {
  return (
    <main className={styles.dashboard}>
      <DashboardLayout>
        <EmailValidator />
      </DashboardLayout>
    </main>
  );
}
