import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import TasksTable from "@/components/TasksComponents/TasksTable";
import { TableContextProvider } from "@/contexts/TableContext";
import React from "react";
import tasks from "@/shared/data/MockTasks.json";
import Cursor from "@/components/LandingComponents/Cursor";
import styles from "@/styles/Home.module.css";

export default function Tasks() {
  const fetchSize = 10;
  function fetchTasks() {
    console.log("fetchTasks");
  }
  return (
    <main className={styles.dashboard}>
      <DashboardLayout>
        <TableContextProvider fetchDataFunction={fetchTasks}>
          <TasksTable tasks={tasks} />
        </TableContextProvider>
      </DashboardLayout>
    </main>
  );
}
