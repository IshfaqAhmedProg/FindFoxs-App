import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import GoogleMapsScraper from "@/components/ToolsComponents/GoogleMapsScraper/GoogleMapsScraper";

export default function googleMapsScraper() {
  return (
    <main className={styles.dashboard}>
      <DashboardLayout>
        <GoogleMapsScraper />
      </DashboardLayout>
    </main>
  );
}
