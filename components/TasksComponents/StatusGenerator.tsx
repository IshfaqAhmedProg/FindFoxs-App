import React from "react";
import { Stack, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import capitalizeFirstLetter from "@/shared/functions/stringTransformers/capitaliseFirstLetter";
import { Status } from "@/shared/interfaces/Tasks";
interface Props extends Status {
  variant?: "small" | "large";
}
export default function StatusGenerator({ status, variant = "small" }: Props) {
  const statString = capitalizeFirstLetter(status.toLocaleLowerCase());
  const iconStyle =
    variant == "small"
      ? {
          width: ".9375rem",
          height: ".9375rem",
        }
      : {
          width: "1.2rem",
          height: "1.2rem",
        };
  const containerStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  };
  const fontStyle =
    variant == "small"
      ? {
          fontSize: "11px",
        }
      : {
          fontSize: "14px",
        };
  switch (status) {
    case "COMPLETE":
      return (
        <Stack sx={containerStyle}>
          <CheckCircleOutlineRoundedIcon
            sx={{
              color: "var(--accent)",
              ...iconStyle,
            }}
          />
          <Typography sx={fontStyle} color="var(--accent)">
            {statString}
          </Typography>
        </Stack>
      );
      break;
    case "FAILED":
      return (
        <Stack sx={containerStyle}>
          <CancelOutlinedIcon
            sx={{
              color: "var(--error)",
              ...iconStyle,
            }}
          />
          <Typography sx={fontStyle} color="var(--error)">
            {statString}
          </Typography>
        </Stack>
      );
      break;
    case "RUNNING":
      return (
        <Stack sx={containerStyle}>
          <ManageHistoryRoundedIcon
            sx={{
              color: "var(--primarylight)",

              ...iconStyle,
            }}
          />
          <Typography sx={fontStyle} color="var(--primarylight)">
            {statString}
          </Typography>
        </Stack>
      );
      break;
    default:
      throw new Error("No status selected");
      break;
  }
}
