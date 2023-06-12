"use client";
import { Box } from "@mui/material";
import SingleStatCard from "@/components/DashboardComponents/Cards/SingleStatCard";

export default function CostsCard() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gridTemplateRows="1fr 1fr"
      width="100%"
      gap={3}
    >
      <SingleStatCard
        title="Total spent on Leads (this month)"
        stat={52}
        unit="$"
      />
      <SingleStatCard title="Most Expensive Lead" stat={85} unit="$" />
      <SingleStatCard title="Average Lead cost" stat={65} unit="$" />
      <SingleStatCard
        title="Total spent on Leads (all time)"
        stat={25}
        unit="$"
      />
    </Box>
  );
}
