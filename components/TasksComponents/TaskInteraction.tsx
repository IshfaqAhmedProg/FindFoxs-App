import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import Task from "@/shared/interfaces/Tasks";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
export default function TaskInteraction({ task }: { task: Task }) {
  return (
    <Box display="flex" gap={0.2} flexGrow={1} justifyContent="flex-end">
      {task.status != "FAILED" ? (
        <Tooltip title={"Open Task " + task._id}>
          <span>
            <IconButton disabled={task.status == "RUNNING"}>
              <FileOpenOutlinedIcon
                sx={
                  task.status == "RUNNING"
                    ? { color: "var(--graylight)" }
                    : {
                        color: "var(--primarylight)",
                      }
                }
              />
            </IconButton>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title={"Rerun task " + task._id}>
          <span>
            <IconButton>
              <AutorenewRoundedIcon
                sx={{
                  color: "var(--primarylight)",
                }}
              />
            </IconButton>
          </span>
        </Tooltip>
      )}
      <Tooltip title={"Delete Task " + task._id}>
        <span>
          <IconButton disabled={task.status == "RUNNING"}>
            <DeleteOutlinedIcon
              sx={
                task.status == "RUNNING"
                  ? { color: "var(--graylight)" }
                  : {
                      color: "var(--primarylight)",
                      ":hover": { color: "var(--error)" },
                    }
              }
            />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
