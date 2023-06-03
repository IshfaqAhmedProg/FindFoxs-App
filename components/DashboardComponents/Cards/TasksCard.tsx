import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import Tasks, { Tools } from "@/shared/interfaces/Tasks";
import TaskListItem from "@/components/TaskComponent/TaskListItem";
import { Stack, Divider } from "@mui/material";
export default function TasksCard() {
  const tasks: Array<Tasks> = [
    {
      id: "135498556s",
      tool: "Google Maps Scraper",
      queryCount: 215,
      startTime: new Date("25 Feb 2022"),
      status: "RUNNING",
    },
    {
      id: "135498dsas",
      tool: "Email Validator",
      queryCount: 15,
      startTime: new Date("27 Feb 2022"),
      status: "FAILED",
    },
    {
      id: "98dsa1354s",
      tool: "Email Validator",
      queryCount: 320,
      startTime: new Date("27 Feb 2023"),
      status: "RUNNING",
    },
    {
      id: "3598dsa14s",
      tool: "Email And Contacts Scraper",
      queryCount: 10,
      startTime: new Date("28 Feb 2023"),
      status: "COMPLETE",
    },
  ];

  return (
    <DashboardCardsLayout title="Tasks" minHeight="236px">
      <Stack padding={1}>
        {tasks.map((task) => {
          return (
            <Stack key={task.id}>
              <TaskListItem task={task} />
              <Divider sx={{ mx: 2 }} />
            </Stack>
          );
        })}
      </Stack>
    </DashboardCardsLayout>
  );
}
