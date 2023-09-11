import DisplayStat from "@/components/CustomComponents/DisplayStats/DisplayStat";
import Loading from "@/components/Loading/Loading";
import CircularProgress from "@/components/ProgressBars/CircularProgress";
import HorizontalProgress from "@/components/ProgressBars/HorizontalProgress";
import Stats, { Stat } from "@/shared/interfaces/Stats";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
interface Props {
  loading: boolean;
  confidence: number;
  result: string;
  resultStat: Array<Stats>;
}
export default function SingleResultCard({
  loading,
  confidence,
  result,
  resultStat,
}: Props) {
  // console.log(resultStat);

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
      position={"relative"}
    >
      <CircularProgress value={confidence} title="Validity" />
      <Typography
        variant="h3"
        color={
          result.includes("Invalid")
            ? "var(--error)"
            : result.includes("Disposable")
            ? "var(--primary)"
            : result.includes("yet!")
            ? "var(--graylight)"
            : result.includes("Valid")
            ? "var(--accent)"
            : "var(--primarylight)"
        }
      >
        {result}
      </Typography>
      <Box minWidth={"350px"}>
        <Divider />
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <Stack gap={3} width={"100%"} px={3}>
          {resultStat.map((stat) => {
            if (typeof stat.stats[0].title == "number")
              return (
                <HorizontalProgress
                  key={stat.statTitle}
                  value={stat.stats[0].title}
                  maxValue={100}
                  valueId="Danger"
                  title="Risk"
                />
              );
            else return <DisplayStat key={stat.statTitle} stat={stat} />;
          })}
        </Stack>
      )}
    </Stack>
  );
}
