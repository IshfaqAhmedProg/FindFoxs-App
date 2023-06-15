import SingleStatSmall from "@/components/DisplayStats/SingleStatSmall";
import CircularProgress from "@/components/ProgressBars/CircularProgress";
import HorizontalProgress from "@/components/ProgressBars/HorizontalProgress";
import Stats, { Stat } from "@/shared/interfaces/Stats";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
interface Props {
  confidence: number;
  result: string;
  resultStat: Array<Stats>;
}
export default function SingleResultCard({
  confidence,
  result,
  resultStat,
}: Props) {
  return (
    <Stack
      gridRow={"span 2"}
      boxShadow="inset var(--box-shadow)"
      borderRadius="var(--border-radius)"
      maxWidth={"650px"}
      width={"80%"}
      minHeight={"450px"}
      sx={{
        overflowY: "auto",
        ["@container (max-width: 720px)"]: {
          gridRow: "span 1",
        },
      }}
      alignItems={"center"}
      p={3}
      pt={6}
      gap={3}
    >
      <CircularProgress value={confidence} title="Confidence" />
      <Typography variant="h3" color={"var(--primarylight)"}>
        {result}
      </Typography>
      <Box minWidth={"350px"}>
        <Divider />
      </Box>
      <Stack gap={3}>
        {resultStat.map((stat) => {
          return <SingleStatSmall key={stat.statTitle} stat={stat} />;
        })}
        <HorizontalProgress
          value={15}
          maxValue={100}
          valueId="Danger"
          title="Risk"
        />
      </Stack>
    </Stack>
  );
}
