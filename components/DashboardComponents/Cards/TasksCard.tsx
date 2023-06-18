import React, { useState, useEffect } from "react";

import DashboardCardsLayout from "./DashboardCardsLayout";
import Task, { Tools, isTask } from "@/shared/interfaces/Tasks";
import TaskListItem from "@/components/TasksComponents/TaskListItem";
import { Stack, Divider } from "@mui/material";
import tasks from "@/shared/data/MockTasks.json";
import { DataTypesSupported } from "@/shared/interfaces/Table";
import useFirestoreCollection from "@/shared/hooks/useFirestoreCollection";

export default function TasksCard() {
  const uid = typeof window !== "undefined" && localStorage.getItem("uid");
  const [tasks, setTasks] = useState<DataTypesSupported>([]);

  const [results, loading, error, fetchDataFunction] = useFirestoreCollection({
    collectionString: "tasks",
    whereObject: {
      fieldPath: "uid",
      opStr: "==",
      value: uid,
    },
    orderByObject: {
      fieldPath: "dateCreated",
      order: "desc",
    },
    fetchSize: 10,
  });
  useEffect(() => {
    if (results && Array.isArray(results)) {
      setTasks(results);
    }
  }, [results]);
  return (
    <DashboardCardsLayout title="Tasks" minHeight="236px">
      <Stack padding={1}>
        {tasks.map((task) => {
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
