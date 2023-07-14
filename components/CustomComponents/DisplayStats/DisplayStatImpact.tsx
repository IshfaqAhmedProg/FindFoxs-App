import React from "react";
import { Stat } from "@/shared/interfaces/Stats";
import { Stack, Typography } from "@mui/material";

export default function DisplayStatImpact({ title, statUnit, stat }: Stat) {
  return (
    <Stack>
      <Typography variant="h5" textAlign="center">
        {title} <span className="trailingText">{statUnit}</span>
      </Typography>
      <Typography fontSize="250%" variant="h3" color="secondary">
        {stat}
      </Typography>
    </Stack>
  );
}
