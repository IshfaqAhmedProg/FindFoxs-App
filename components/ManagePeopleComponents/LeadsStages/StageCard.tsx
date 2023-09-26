import CustomBox from "@/components/CustomComponents/CustomBox";
import { Stack, Typography } from "@mui/material";
import React from "react";
interface Props {
  name: string;
  stageTotalLeads: number;
  stageTotalMonth: number;
  color?: string;
}
interface StageStatProps {
  title: string;
  subTitle?: string;
  value: number | string;
}
const StageStat = (props: StageStatProps) => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack>
        <Typography variant="h5" color={"white"}>
          {props.title}
        </Typography>
        {props.subTitle && (
          <Typography
            lineHeight={1}
            fontWeight={"medium"}
            color={"white"}
            sx={{ opacity: 0.6 }}
          >
            {props.subTitle}
          </Typography>
        )}
      </Stack>
      {typeof props.value === "number" ? (
        <Typography variant="h4" color={"white"}>
          {props.value}
        </Typography>
      ) : (
        <Typography variant="h5" color={"white"} sx={{ opacity: 0.6 }}>
          {props.value}
        </Typography>
      )}
    </Stack>
  );
};
export default function StageCard(props: Props) {
  return (
    <CustomBox
      width={"100%"}
      minWidth={"250px"}
      height={"100%"}
      variant="outer"
      sx={{ background: props.color }}
      px={2}
    >
      <Stack height={"100%"} pt={4} alignItems={"center"} gap={4}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          color={"var(--primarylighter)"}
          sx={{ mixBlendMode: "screen" }}
        >
          {props.name}
        </Typography>
        <CustomBox
          variant="inner"
          sx={{ background: "rgba(0,0,0,0.15)" }}
          boxShadow={"inset 0px 0px 10px #00000055"}
          width={"100%"}
          minHeight={"200px"}
          px={3}
          py={3}
        >
          <Stack width={"100%"}>
            <StageStat title="Total" value={props.stageTotalLeads} />
            <StageStat
              title="Total added"
              subTitle="this month"
              value={props.stageTotalMonth}
            />
            <StageStat
              title="Total"
              subTitle="this month"
              value={props.stageTotalMonth}
            />
          </Stack>
        </CustomBox>
      </Stack>
    </CustomBox>
  );
}
