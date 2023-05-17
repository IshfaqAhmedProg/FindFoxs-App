import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import { ResponsivePieCanvas } from "@nivo/pie";
import data from "@/shared/data/MockLeadsSources.json";
import { nivoTheme } from "@/shared/theme/nivoTheme";

export default function LeadsSourcesCard() {
  return (
    <DashboardCardsLayout title="Leads Sources" minHeight="430px">
      <ResponsivePieCanvas
        data={data}
        theme={nivoTheme}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        innerRadius={0.1}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={["#1D276B", "#303F9F", "#5467E4", "#13A386", "#064C2C"]}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={{
          from: "color",
          modifiers: [["opacity", 3]],
        }}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["brighter", 3]],
        }}
      />
    </DashboardCardsLayout>
  );
}
