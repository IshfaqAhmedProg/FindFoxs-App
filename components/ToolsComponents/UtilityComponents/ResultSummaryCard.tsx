import { Box, ButtonGroup, Divider, Typography } from "@mui/material";
import React from "react";
import SingleStatSmall from "../../CustomComponents/DisplayStats/SingleStatSmall";
import CustomButton from "../../CustomComponents/CustomButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import Task from "@/shared/interfaces/Tasks";
import { formatDate, formatTime } from "@/shared/functions/formatDateTime";
import StatusGenerator from "../../TasksComponents/StatusGenerator";

export default function ResultSummaryCard({ task }: { task: Task }) {
  return (
    <>
      <Typography variant="h4">Summary</Typography>
      <Divider />
      <SingleStatSmall
        stat={{
          statTitle: task.tool,
          stats: [
            {
              title: "Query count",
              stat: task.queryCount.toString(),
              statUnit: `${task.unit}(s)`,
            },
            {
              title: "Created at",
              stat: formatDate(new Date(task.startTime)),
              statUnit: formatTime(new Date(task.startTime)),
            },
            {
              title: "Completed at",
              stat: formatDate(new Date(task.endTime)),
              statUnit: formatTime(new Date(task.endTime)),
            },
            {
              title: "Status",
              stat: <StatusGenerator status={task.status} variant="large" />,
            },
          ],
        }}
      />
      <Box display={"flex"} gap={3}>
        <CustomButton
          buttonProps={{ size: "small", startIcon: <ShareRoundedIcon /> }}
        >
          Share
        </CustomButton>
        <ButtonGroup variant="text">
          <CustomButton buttonProps={{ size: "small" }} kind="secondary">
            Download
          </CustomButton>
          <CustomButton buttonProps={{ size: "small" }} kind="secondary">
            <ArrowDropDownIcon />
          </CustomButton>
        </ButtonGroup>
      </Box>
    </>
  );
}
