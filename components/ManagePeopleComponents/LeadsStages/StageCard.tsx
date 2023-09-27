import CustomBox from "@/components/CustomComponents/CustomBox";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { nivoTheme } from "@/shared/themes/nivoTheme";
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
const StageStat = (props: StageStatProps) => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack>
        <Typography variant="h5" color={"var(--primary)"}>
          {props.title}
        </Typography>
        {props.subTitle && (
          <Typography
            lineHeight={1}
            fontWeight={"medium"}
            color={"var(--graylight)"}
          >
            {props.subTitle}
          </Typography>
        )}
      </Stack>
      {typeof props.value === "number" ? (
        <Typography variant="h4" color={"var(--accent)"}>
          {props.value}
        </Typography>
      ) : (
        <Typography variant="h5" color={"var(--primarylight)"}>
          {props.value}
        </Typography>
      )}
    </Stack>
  );
};
export default function StageCard(props: Props) {
  const data = [
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
      height={"100%"}
      variant="outer"
      px={2}
    >
      <Stack height={"100%"} alignItems={"center"} gap={3} pt={3}>
        <Typography variant="h4" fontWeight={"bold"} color={props.color}>
          {props.name}
        </Typography>
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
              <MyResponsiveLine data={data} color={props.color} />
            </div>
            <Stack width={"100%"} alignItems={"center"} gap={1} mt={3}>
              <StageStat
                title="Total"
                value={props.stageTotalLeads}
                color={props.color}
              />
              <StageStat
                title="Total added"
                subTitle="this month"
                value={props.stageTotalMonth}
                color={props.color}
              />
              <StageStat
                title="Total"
                subTitle="this month"
                value={"london"}
                color={props.color}
              />
              <StageStat
                title="Total"
                subTitle="this month"
                value={props.stageTotalMonth}
                color={props.color}
              />
              <StageStat
                title="Total"
                subTitle="this month"
                value={props.stageTotalMonth}
                color={props.color}
              />
            </Stack>
          </CustomBox>
        </CustomBox>
      </Stack>
    </CustomBox>
  );
}
