import { useRouter } from "next/router";
import TaskResultComponent from "@/components/TasksComponents/TaskResultComponent";
import CustomCard from "@/components/CustomComponents/CustomCard";

export default function TaskResult() {
  const router = useRouter();
  const { taskId } = router.query;
  return (
    <CustomCard title={`Task #${taskId}`}>
      {taskId && typeof taskId == "string" && (
        <TaskResultComponent taskId={taskId} />
      )}
    </CustomCard>
  );
}
