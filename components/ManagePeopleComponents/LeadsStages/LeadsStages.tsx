import { Stack } from "@mui/material";
import React from "react";
import StageCard from "./StageCard";

export default function LeadsStages() {
  return (
    <Stack
      direction={"row"}
      gap={5}
      p={3}
      height={"100%"}
      flexWrap={"nowrap"}
      sx={{ overflowX: "auto" }}
    >
      <StageCard
        name="Awareness"
        stageTotalLeads={425}
        stageTotalMonth={125}
        color={"var(--primarydark)"}
      />
      <StageCard
        name="Lead Capture"
        stageTotalLeads={10}
        stageTotalMonth={125}
        color={"var(--primary)"}
      />
      <StageCard
        name="Prospect"
        stageTotalLeads={10}
        stageTotalMonth={125}
        color={"var(--primarylight)"}
      />
      <StageCard
        name="Qualified Leads"
        stageTotalLeads={10}
        stageTotalMonth={125}
        color={"var(--accentdark)"}
      />
      <StageCard
        name="Customer"
        stageTotalLeads={10}
        stageTotalMonth={125}
        color={"var(--accent)"}
      />
    </Stack>
  );
}
