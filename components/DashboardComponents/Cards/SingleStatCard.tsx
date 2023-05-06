import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import { Box, Typography } from "@mui/material";
interface Props {
  title: string;
  stat: number | string;
  total?: number | string;
}
export default function SingleStatCard({ title, stat, total }: Props) {
  return (
    <Box
      p={3}
      boxShadow="var(--box-shadow)"
      borderRadius="var(--border-radius)"
      bgcolor="white"
      display="flex"
      justifyContent="center"
      alignItems="flex-end"
      position="relative"
      minHeight="6.875rem"
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: { sm: ".75rem", md: ".875rem" },
          position: "absolute",
          top: "10%",
          left: "10%",
        }}
      >
        {title}
      </Typography>
      <Typography fontSize="250%" variant="h3" color="secondary">
        {stat}
        {total && "/"}
        {total && <span className="muted">{total}</span>}
      </Typography>
    </Box>
  );
}
