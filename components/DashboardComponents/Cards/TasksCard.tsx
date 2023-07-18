import TaskListItem from "@/components/TasksComponents/TaskListItem";
import useReadTasks from "@/shared/hooks/useReadTasks";
import Task, { isTask } from "@/shared/interfaces/Tasks";
import { Divider, Stack } from "@mui/material";
import DashboardCardsLayout from "./DashboardCardsLayout";
const queryLimit = 5;

export default function TasksCard() {
  const [results, loading, error, fetchDataFunction] = useReadTasks({
    queryLimit,
  });
  return (
    <DashboardCardsLayout title="Tasks" minHeight="236px">
      <Stack padding={1}>
        {results &&
          results.map((task) => {
            if (isTask<Task>(task))
              return (
                <Stack key={task._id}>
                  <TaskListItem task={task} />
                  <Divider sx={{ mx: 2 }} />
                </Stack>
              );
          })}
      </Stack>
    </DashboardCardsLayout>
  );
}
