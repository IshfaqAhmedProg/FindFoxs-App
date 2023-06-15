import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import { ResponsiveFunnel } from "@nivo/funnel";
import data from "@/shared/data/MockLeadsStages.json";
import { nivoTheme } from "@/shared/theme/nivoTheme";
import { Box, Typography, Stack } from "@mui/material";
export default function LeadStagesCard() {
  const gridTemplateAreas = `"stage1 funnel" "stage2 funnel" "stage3 funnel" "stage4 funnel" "stage5 funnel"`;
  const bullets = (
    <>
      {data.map((stage) => {
        return (
          <Stack
            key={stage.id}
            gridArea={stage.id}
            justifyContent={"center"}
            bgcolor={"var(--graylighter)"}
            my={0.5}
            borderRadius={
              "0  var(--border-radius-small) var(--border-radius-small) 0"
            }
          >
            <Typography
              fontSize={"20px"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              {stage.value}
            </Typography>
            <Typography fontSize={"xs"} textAlign={"center"}>
              {stage.label}
            </Typography>
          </Stack>
        );
      })}
    </>
  );
  return (
    <DashboardCardsLayout title="Leads Stages" minHeight="406px">
      <Box
        display={"grid"}
        gridTemplateColumns={"25% 75%"}
        gridTemplateRows={"100px 100px 100px 100px 100px"}
        gridTemplateAreas={gridTemplateAreas}
        py={4}
      >
        {bullets}
        <Box gridArea={"funnel"} position={"relative"}>
          <ResponsiveFunnel
            data={data}
            // margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
            valueFormat=">-.4s"
            colors={["#1D276B", "#303F9F", "#5467E4", "#13A386", "#00e676"]}
            borderWidth={20}
            shapeBlending={0.36}
            labelColor={{
              from: "color",
              modifiers: [["brighter", 4]],
            }}
            beforeSeparatorOffset={10}
            beforeSeparatorLength={20}
            afterSeparatorLength={50}
            afterSeparatorOffset={0}
            currentPartSizeExtension={10}
            motionConfig="gentle"
            theme={nivoTheme}
          />
        </Box>
      </Box>
    </DashboardCardsLayout>
  );
}
