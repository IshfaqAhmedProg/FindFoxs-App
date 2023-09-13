import React from "react";
import { Stack, Typography, Chip } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import capitalizeFirstLetter from "@/shared/functions/stringTransformers/capitaliseFirstLetter";
import { Status } from "@/shared/interfaces/Tasks";
interface Props extends Status {
  variant?: "small" | "medium";
}
export default function StatusGenerator({ status, variant = "small" }: Props) {
  const statString = capitalizeFirstLetter(status.toLocaleLowerCase());

  switch (status) {
    case "COMPLETE":
      return (
        <Chip
          icon={<CheckCircleOutlineRoundedIcon />}
          label={statString}
          color="success"
          size={variant}
        />
      );
      break;
    case "FAILED":
      return (
        <Chip
          icon={<CancelOutlinedIcon />}
          label={statString}
          color="error"
          size={variant}
        />
      );
      break;
    case "RUNNING":
      return (
        <Chip
          icon={<ManageHistoryRoundedIcon />}
          label={statString}
          color="primary"
          size={variant}
        />
      );
      break;
    default:
      throw new Error("No status selected");
      break;
  }
}
