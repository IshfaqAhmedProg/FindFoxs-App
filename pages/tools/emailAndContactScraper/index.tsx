import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import EmailAndContactsScraper from "@/components/ToolsComponents/EmailAndContacts/EmailAndContactsScraper";

export default function emailAndContactsScraper() {
  return (
    <main className={styles.dashboard}>
      <DashboardLayout>
        <EmailAndContactsScraper />
      </DashboardLayout>
    </main>
  );
}
