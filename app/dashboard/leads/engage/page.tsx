import React from "react";
import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";

export default function EngageLeads() {
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Engage with Leads"></DashboardLayout>
    </main>
  );
}
