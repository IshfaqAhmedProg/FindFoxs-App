import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import LeadConversionCard from "@/components/DashboardComponents/Cards/LeadConversionCard";
import TasksCard from "@/components/DashboardComponents/Cards/TasksCard";
import { Box } from "@mui/material";
import SingleStatCard from "@/components/DashboardComponents/Cards/SingleStatCard";
import LeadsSourcesCard from "@/components/DashboardComponents/Cards/LeadsSourcesCard";
import TeamActivityCard from "@/components/DashboardComponents/Cards/TeamActivityCard";
import LeadStagesCard from "@/components/DashboardComponents/Cards/LeadStagesCard";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>FindFoxs-Dashboard</title>
      </Head>
      <LeadConversionCard />
      <TasksCard />
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
      <LeadsSourcesCard />
      <TeamActivityCard />
      <LeadStagesCard />
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
    </>
  );
}
