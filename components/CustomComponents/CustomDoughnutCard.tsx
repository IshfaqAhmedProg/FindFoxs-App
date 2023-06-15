import { IEmailValidatorResult } from "@/shared/interfaces/Tasks";
import { nivoTheme } from "@/shared/theme/nivoTheme";
import { Chip, Stack, Typography } from "@mui/material";
import { ResponsivePieCanvas } from "@nivo/pie";
import React from "react";
type pieData = {
  id: string;
  label: string;
  value: number;
};
export default function CustomDoughnutCard({
  total,
  data,
  centerValue,
  unit,
  maxHeight,
  colors,
}: {
  total: number;
  data: Array<pieData>;
  centerValue: string;
  unit?: string;
  maxHeight: string;
  colors: Array<string>;
}) {
  return (
    <>
      <Stack
        position="relative"
        maxHeight={maxHeight}
        minWidth={"310px"}
        height="100%"
      >
        <ResponsivePieCanvas
          data={data}
          theme={nivoTheme}
          innerRadius={0.7}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          padAngle={0.7}
          cornerRadius={5}
          activeOuterRadiusOffset={8}
          colors={colors}
          enableArcLinkLabels={false}
          enableArcLabels={false}
        />
        <Stack
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          alignItems={"center"}
          sx={{ transform: "translate(-50%,-50%)" }}
        >
          <Typography fontWeight={"bold"} fontSize={"35px"} color={colors[0]||"var(--primary)"}>
            {centerValue}%
          </Typography>
          <Typography fontWeight={"bold"} color={"var(--graylight)"}>
            {unit}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        justifyContent={"center"}
        gap={3}
        flexGrow={1}
        minWidth={"300px"}
        maxWidth={"350px"}
      >
        {data.map((r, index) => {
          return (
            <Stack
              key={r.id}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <Chip
                  label={`${((r.value / total) * 100).toFixed(1)}%`}
                  sx={{
                    bgcolor: colors[index],
                    color: "var(--white)",
                    fontWeight: "bold",
                    minWidth: "3.5rem",
                  }}
                  size="small"
                />
                <Typography variant="h5">{r.label}</Typography>
              </Stack>
              <Typography>{r.value}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
}
