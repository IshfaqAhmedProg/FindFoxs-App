import React, { useState, ComponentProps } from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import { PieChart } from "react-minimal-pie-chart";
import { Box } from "@mui/material";
type Props = {
  data: ComponentProps<typeof PieChart>["data"];
};

export default function CurrentMonthLeadsSourcesCard(props: Props) {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "var(--accent)",
      };
    }
    return entry;
  });
  return (
    <DashboardCardsLayout title="Current Month Leads Sources" minHeight="430px">
      <Box color="white">
        <PieChart
          label={({ dataEntry }) =>
            dataEntry.title + "\n" + dataEntry.value + "%"
          }
          labelStyle={{
            fontSize: "3px",
            fill: "white",
            pointerEvents: "none",
          }}
          labelPosition={70}
          data={data}
          radius={40}
          segmentsStyle={{ transition: "stroke .4s ease", cursor: "pointer" }}
          segmentsShift={(index) => (index === hovered ? 2 : 1)}
          onClick={(event, index) => {
            setSelected(index === selected ? undefined : index);
          }}
          onMouseOver={(_, index) => {
            setHovered(index);
          }}
          onMouseOut={() => {
            setHovered(undefined);
          }}
        />
      </Box>
    </DashboardCardsLayout>
  );
}
