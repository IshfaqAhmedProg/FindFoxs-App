import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import { Box, Typography } from "@mui/material";
interface Props {
  title: string;
  stat: number | string;
  total?: number | string;
  unit?: string;
}
export default function SingleStatCard({ title, stat, total, unit }: Props) {
  return (
    <Box
      p={3}
      boxShadow="var(--box-shadow)"
      borderRadius="var(--border-radius)"
      bgcolor="white"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      minHeight="6.875rem"
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: { sm: ".75rem", md: ".875rem" },
        }}
      >
        {title}
      </Typography>
      <Typography fontSize="250%" variant="h3" color="secondary">
        {stat}
        {total && "/"}
        {total && <span className="muted">{total}</span>}
        {unit && <span className="muted">{unit}</span>}
      </Typography>
    </Box>
  );
}
