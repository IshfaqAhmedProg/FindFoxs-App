"use client"
import { Box } from "@mui/material";
import SingleStatCard from "@/components/DashboardComponents/Cards/SingleStatCard";

export default function LeadsStatsCard() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gridTemplateRows="1fr 1fr"
      width="100%"
      gap={3}
    >
      <SingleStatCard title="Total Number of Leads" stat={52} />
      <SingleStatCard title="Total Qualified Leads" stat={200} />
      <SingleStatCard title="Satisfied Leads" stat={32} />
      <SingleStatCard title="Leads Searched (this month)" stat={52} />
    </Box>
  );
}
