import TaskListItem from "@/components/TasksComponents/TaskListItem";
import useGetCollection from "@/shared/hooks/useGetCollection";
import Task, { isTask } from "@/shared/interfaces/Tasks";
import { Divider, Stack } from "@mui/material";
import DashboardCardsLayout from "./DashboardCardsLayout";
import { useAuth } from "@/contexts/AuthContext";
const queryLimit = 5;

export default function TasksCard() {
  const { user } = useAuth();
  const [results, loading, error, fetchDataFunction] = useGetCollection({
    queryLimit,
    collection: `users/${user?.uid}/tasks`,
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
