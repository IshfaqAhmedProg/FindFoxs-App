import React, { useEffect } from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import { ResponsiveFunnel } from "@nivo/funnel";
import data from "@/shared/data/MockLeadsStages.json";
import { nivoTheme } from "@/shared/theme/nivoTheme";
import { Grid, Box } from "@mui/material";
export default function LeadStagesCard() {
  return (
    <DashboardCardsLayout title="Leads Stages" minHeight="406px">
      <ResponsiveFunnel
        data={data}
        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.4s"
        colors={["#1D276B", "#303F9F", "#5467E4", "#13A386", "#00e676"]}
        borderWidth={20}
        shapeBlending={0.36}
        labelColor={{
          from: "color",
          modifiers: [["brighter", 3]],
        }}
        beforeSeparatorOffset={20}
        beforeSeparatorLength={100}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="gentle"
        theme={nivoTheme}
      />
    </DashboardCardsLayout>
  );
}
