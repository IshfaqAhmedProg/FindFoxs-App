import CustomBox from "@/components/CustomComponents/CustomBox";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { nivoTheme } from "@/shared/themes/nivoTheme";
import Stats from "@/shared/interfaces/Stats";
import DisplayStat from "@/components/CustomComponents/DisplayStats/DisplayStat";
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
  color?: string;
}

const MyResponsiveLine = ({
  data,
  color,
}: {
  data: Array<Serie>;
  color?: string;
}) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    theme={nivoTheme}
    colors={[color ?? "#303f9f"]}
    curve="catmullRom"
    lineWidth={4}
    pointSize={2}
    pointColor={{ theme: "background" }}
    pointBorderWidth={4}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[]}
  />
);
export default function StageCard(props: Props) {
  const statData: Array<Stats> = [
    {
      statTitle: "Summary",
      statTitleTrailing: "this month",
      stats: [
        { title: "John Bradley", stat: "80", statUnit: "calls" },
        { title: "Peter Petely", stat: "70", statUnit: "calls" },
        { title: "Weter Wetely", stat: "58", statUnit: "calls" },
      ],
    },
  ];
  const lineGraphData = [
    {
      id: "Total added",
      color: "white",
      data: [
        {
          x: "April",
          y: 34,
        },
        {
          x: "May",
          y: 147,
        },
        {
          x: "June",
          y: 65,
        },
        {
          x: "July",
          y: 106,
        },
        {
          x: "Aug",
          y: 118,
        },
        {
          x: "Sept",
          y: 72,
        },
      ],
    },
  ];
  return (
    <CustomBox
      width={"100%"}
      minWidth={"250px"}
      variant="outer"
      height={"100%"}
      sx={{ background: props.color }}
      stack
      alignItems={"center"}
      pt={1}
      gap={1}
    >
      <Typography variant="h5" fontWeight={"bold"} color={"var(--white)"}>
        {props.name}
      </Typography>
      <CustomBox
        width={"100%"}
        height={"100%"}
        stack
        alignItems={"center"}
        gap={3}
        p={1}
        sx={{ background: "var(--white)" }}
      >
        <CustomBox
          width={"100%"}
          minHeight={"200px"}
          maxHeight={"40%"}
          overflow={"hidden"}
        >
          <CustomBox
            variant="inner"
            sx={{ overflowY: "auto" }}
            width={"100%"}
            height={"100%"}
            px={2}
            py={2}
          >
            <div style={{ width: "100%", height: "150px" }}>
              <MyResponsiveLine data={lineGraphData} color={props.color} />
            </div>
            <Stack width={"100%"} alignItems={"center"} gap={3} mt={3}>
              {statData.map((stat) => {
                return <DisplayStat key={stat.statTitle} stat={stat} />;
              })}
            </Stack>
          </CustomBox>
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}
