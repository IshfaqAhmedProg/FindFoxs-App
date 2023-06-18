import React from "react";
import TableCell from "../TableComponents/TableCell";
import StatusGenerator from "./StatusGenerator";
import { Stack, Typography } from "@mui/material";
import {
  formatDate,
  formatTTC,
  formatTime,
} from "@/shared/functions/formatDateTime";
import Task from "@/shared/interfaces/Tasks";
import { DocumentData } from "firebase/firestore";

export default function TasksTableSecondaryItem({
  task,
}: {
  task: Task | DocumentData;
}) {
  const startTime = task.dateCreated?.toDate();
  const endTime = task.dateCompleted?.toDate() ?? undefined;
  const DateTimeComponent = ({ dateTime }: { dateTime: Date }) => {
    return (
      <Stack direction={"row"} gap={0.5} alignItems={"flex-end"}>
        <Typography
          fontWeight={"bold"}
          sx={{
            opacity: "0.5",
          }}
        >
          {formatDate(dateTime)}
        </Typography>
        <Typography>{formatTime(dateTime)}</Typography>
      </Stack>
    );
  };
  return (
    <>
      <TableCell>
        <StatusGenerator status={task.status} variant="large" />
      </TableCell>
      <TableCell>
        <DateTimeComponent dateTime={startTime} />
      </TableCell>
      <TableCell>
        {endTime ? <DateTimeComponent dateTime={endTime} /> : "-"}
      </TableCell>
      <TableCell>
        <Typography>{task.estimatedTTC}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{task.queryCount}</Typography>
      </TableCell>
    </>
  );
}
