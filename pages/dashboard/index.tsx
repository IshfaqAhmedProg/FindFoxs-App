import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import Cursor from "@/components/LandingComponents/Cursor";
import styles from "@/styles/Home.module.css";
import LeadConversion from "@/components/DashboardComponents/Cards/LeadConversion";
export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Dashboard">
        <>
          <LeadConversion />
          <LeadConversion />
          <LeadConversion />
          <LeadConversion />
          <LeadConversion />
          <LeadConversion />
          <LeadConversion />
        </>
      </DashboardLayout>
    </main>
  );
}
