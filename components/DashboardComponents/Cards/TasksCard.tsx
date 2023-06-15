import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import Tasks, { Tools } from "@/shared/interfaces/Tasks";
import TaskListItem from "@/components/TasksComponents/TaskListItem";
import { Stack, Divider } from "@mui/material";
import tasks from "@/shared/data/MockTasks.json";
export default function TasksCard() {
  return (
    <DashboardCardsLayout title="Tasks" minHeight="236px">
      <Stack padding={1}>
        {tasks.map((task) => {
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
