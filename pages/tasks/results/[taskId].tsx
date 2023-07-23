import { useRouter } from "next/router";
import TaskResultComponent from "@/components/TasksComponents/TaskResultComponent";
import CustomCard from "@/components/CustomComponents/CustomCard";
import Head from "next/head";

export default function TaskResult() {
  const router = useRouter();
  const { taskId } = router.query;

  return (
    <>
      <Head>
        <title>FindFoxs-Task Results</title>
      </Head>
      <CustomCard title={`Task #${taskId}`}>
        {taskId && typeof taskId == "string" && (
          <TaskResultComponent taskId={taskId} />
        )}
      </CustomCard>
    </>
  );
}
