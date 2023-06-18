import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import TasksTable from "@/components/TasksComponents/TasksTable";
import styles from "@/styles/Home.module.css";

export default function Tasks() {
  return (
    <main className={styles.dashboard}>
      <DashboardLayout>
        <TasksTable />
      </DashboardLayout>
    </main>
  );
}
