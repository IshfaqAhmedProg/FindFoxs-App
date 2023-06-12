import React from "react";
import { Stack, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  minWidth: 192,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "var(--graylighter)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background:
      "linear-gradient(90deg, var(--primarylight) 0%, var(--accent) 100%)",
  },
}));
interface Props {
  title?: string;
  subtitle?: string;
  value: number;
  maxValue: number;
  valueId?: string;
  full: boolean;
}
export default function HorizontalProgress({
  title,
  subtitle,
  value,
  maxValue,
  valueId,
  full,
}: Props) {
  return (
    <Stack>
      <Stack direction="row" justifyContent="flex-start" pr={2}>
        <Typography fontWeight="bold" color="var(--primary)">
          {title}
        </Typography>
        <Typography color="var(--primarylight)">&nbsp;{subtitle}</Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        mt={1}
        gap={1}
      >
        <Typography fontWeight="bold" color="var(--primary)" fontSize="16px">
          {value}
        </Typography>
        <BorderLinearProgress variant="determinate" value={value} />
        <Stack alignItems="center" position="relative">
          <Typography
            position="absolute"
            top="-50%"
            left="0%"
            color="var(--accent)"
            fontSize="10px"
          >
            {valueId}
          </Typography>
          <Typography fontWeight="bold" color="var(--accent)" fontSize="16px">
            {maxValue}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
