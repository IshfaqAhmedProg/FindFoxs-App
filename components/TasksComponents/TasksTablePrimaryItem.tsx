import Task from "@/shared/interfaces/Tasks";
import {
  Box,
  IconButton,
  Menu,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useRouter } from "next/router";
import { DocumentData } from "firebase/firestore";

export default function TasksTablePrimaryItem({
  task,
}: {
  task: Task | DocumentData;
}) {
  const router = useRouter();
  const SeeMoreButton = {
    height: "100%",
    borderRadius: "var(--border-radius-small) 0 0 var(--border-radius-small)",
  };
  function handleSeeMoreClick() {
    router.push(`/tasks/results/${task._id}`);
  }
  return (
    <>
      <Stack direction="row" gap={0.5} alignItems={"center"}>
        <Box textOverflow="ellipsis" overflow="hidden" width="20ch">
          <Tooltip title={task.tool}>
            <Typography fontSize="13px" noWrap color="primary">
              <strong>{task.tool}</strong>
            </Typography>
          </Tooltip>
          <Tooltip title={task._id}>
            <Typography
              variant="h4"
              fontSize="16px"
              color="var(--graylight)"
              noWrap
            >
              #{task._idShort}
            </Typography>
          </Tooltip>
        </Box>
        <IconButton
          sx={SeeMoreButton}
          onClick={handleSeeMoreClick}
          aria-controls={task._id}
          aria-haspopup="true"
          aria-expanded={"true"}
          disabled={task.status == "RUNNING"}
        >
          <ChevronRightRoundedIcon
            sx={
              task.status != "RUNNING"
                ? { fontSize: "25px", color: "var(--graylight)" }
                : { fontSize: "25px", color: "var(--graylighter)" }
            }
          />
        </IconButton>
      </Stack>
    </>
  );
}