import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import Task from "@/shared/interfaces/Tasks";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
export default function TaskInteraction({ task }: { task: Task }) {
  return (
    <Box display="flex" gap={0.2} flexGrow={1} justifyContent="flex-end">
      <Tooltip title={"Open Task " + task.id}>
        <IconButton size="small" disabled={task.status == "RUNNING"}>
          <FileOpenOutlinedIcon
            sx={
              task.status == "RUNNING"
                ? { color: "var(--graylight)", fontSize: "1.125rem" }
                : {
                    fontSize: "1.125rem",
                    color: "var(--primarylight)",
                  }
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title={"Delete Task " + task.id}>
        <IconButton size="small" disabled={task.status == "RUNNING"}>
          <DeleteOutlinedIcon
            sx={
              task.status == "RUNNING"
                ? { color: "var(--graylight)", fontSize: "1.125rem" }
                : {
                    fontSize: "1.125rem",
                    color: "var(--primarylight)",
                    ":hover": { color: "var(--error)" },
                  }
            }
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
