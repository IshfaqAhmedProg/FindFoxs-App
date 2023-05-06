import React from "react";
import { Stack, Typography } from "@mui/material";
import Stats from "@/shared/interfaces/Stats";

export default function SingleStatSmall({ stat }: { stat: Stats }) {
  return (
    <Stack gap={2}>
      <Typography variant="h5">
        {stat.statTitle}&nbsp;
        <span className="trailingText">{stat.statTitleTrailing}</span>
      </Typography>
      <Stack gap={1}>
        {stat.stats.map((s, index) => {
          return (
            <Stack direction="row" justifyContent="space-between" key={index}>
              <Typography>{s.title}</Typography>
              <Typography color="secondary" fontWeight="bold">
                {s.stat}&nbsp;
                <span className="trailingText">{s.statUnit}</span>
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
