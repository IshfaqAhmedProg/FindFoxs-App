import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import Task, { Status } from "@/shared/interfaces/Tasks";

import StatusGenerator from "./StatusGenerator";
import TaskInteraction from "./TaskInteraction";
export default function TaskListItem({ task }: { task: Task }) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      flexGrow={1}
      py={2}
      px={0.5}
      sx={{
        transition: "background 0.15s ease-in",
        ":hover": {
          background: "var(--graylighter)",
        },
        borderRadius: "var(--border-radius-small)",
        cursor: "pointer",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        flexGrow={1}
        flexWrap="wrap"
        gap={2}
        justifyContent="space-around"
      >
        <Box textOverflow="ellipsis" overflow="hidden" width="11ch">
          <Tooltip title={task.tool}>
            <Typography fontSize="13px" noWrap color="primary">
              <strong>{task.tool}</strong>
            </Typography>
          </Tooltip>
          <Tooltip title={task.id}>
            <Typography
              variant="h4"
              fontSize="12px"
              color="var(--graylight)"
              noWrap
            >
              #{task.id}
            </Typography>
          </Tooltip>
        </Box>
        <Box textOverflow="ellipsis" overflow="hidden" width="7ch">
          <Typography fontSize="11px" noWrap textAlign="center">
            <strong>{task.queryCount}</strong> queries
          </Typography>
        </Box>
        <Box textOverflow="ellipsis" overflow="hidden" width="7ch">
          <Tooltip title={task.startTime.toDateString()}>
            <Typography fontSize="11px" noWrap textAlign="center">
              {task.startTime.toDateString()}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          display="flex"
          gap={0.5}
          alignItems="center"
          textOverflow="ellipsis"
          overflow="hidden"
          minWidth="7.1875rem"
        >
          <Typography variant="body2" fontSize="11px">
            Status:
          </Typography>
          <StatusGenerator status={task.status} />
        </Box>
      </Box>
      <TaskInteraction task={task} />
    </Box>
  );
}
