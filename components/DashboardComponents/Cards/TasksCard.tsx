import React, { useState, useEffect } from "react";

import DashboardCardsLayout from "./DashboardCardsLayout";
import Task, { Tools, isTask } from "@/shared/interfaces/Tasks";
import TaskListItem from "@/components/TasksComponents/TaskListItem";
import { Stack, Divider } from "@mui/material";
import { DataTypesSupported } from "@/shared/interfaces/Table";
import useReadTasks from "@/shared/hooks/useReadTasks";
const queryLimit = 5;

export default function TasksCard() {
  const uid = typeof window !== "undefined" && localStorage.getItem("uid");

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
