import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import TaskResultComponent from "@/components/TasksComponents/TaskResultComponent";
import CustomCard from "@/components/CustomComponents/CustomCard";

export default function TaskResult() {
  const router = useRouter();
  const { taskId } = router.query;
  return (
    <main className={styles.dashboard}>
      <DashboardLayout>
        <CustomCard title={`Task #${taskId}`}>
          {taskId && typeof taskId == "string" && (
            <TaskResultComponent taskId={taskId} />
          )}
        </CustomCard>
      </DashboardLayout>
    </main>
  );
}
