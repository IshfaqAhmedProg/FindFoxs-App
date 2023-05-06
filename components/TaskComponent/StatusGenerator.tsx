import React from "react";
import { Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import capitalizeFirstLetter from "@/shared/functions/capitaliseFirstLetter";
import { Status } from "@/shared/interfaces/Tasks";

export default function StatusGenerator({ status }: Status) {
  const statString = capitalizeFirstLetter(status.toLocaleLowerCase());
  switch (status) {
    case "COMPLETE":
      return (
        <>
          <CheckCircleOutlineRoundedIcon
            sx={{
              color: "var(--accent)",
              width: ".9375rem",
              height: ".9375rem",
            }}
          />
          <Typography fontSize="11px" color="var(--accent)">
            {statString}
          </Typography>
        </>
      );
      break;
    case "FAILED":
      return (
        <>
          <CancelOutlinedIcon
            sx={{
              color: "var(--error)",
              width: ".9375rem",
              height: ".9375rem",
            }}
          />
          <Typography fontSize="11px" color="var(--error)">
            {statString}
          </Typography>
        </>
      );
      break;
    case "RUNNING":
      return (
        <>
          <ManageHistoryRoundedIcon
            sx={{
              width: ".9375rem",
              height: ".9375rem",
            }}
          />
          <Typography fontSize="11px" color="var(--primarylight)">
            {statString}
          </Typography>
        </>
      );
      break;
    default:
      throw new Error("No status selected");
      break;
  }
}
