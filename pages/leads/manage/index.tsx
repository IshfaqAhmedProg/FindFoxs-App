import React from "react";
import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";

export default function ManageLeads() {
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Manage Your Leads"></DashboardLayout>
    </main>
  );
}
