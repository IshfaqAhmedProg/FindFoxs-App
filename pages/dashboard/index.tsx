import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import LeadConversionCard from "@/components/DashboardComponents/Cards/LeadConversionCard";
import Cursor from "@/components/LandingComponents/Cursor";
import styles from "@/styles/Home.module.css";
export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Dashboard">
        <LeadConversionCard />
      </DashboardLayout>
    </main>
  );
}
