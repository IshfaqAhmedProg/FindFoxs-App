import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import Cursor from "@/components/LandingComponents/Cursor";
import styles from "@/styles/Home.module.css";
import LeadConversionCard from "@/components/DashboardComponents/Cards/LeadConversionCard";
import TasksCard from "@/components/DashboardComponents/Cards/TasksCard";
import { Box, Grid } from "@mui/material";
import SingleStatCard from "@/components/DashboardComponents/Cards/SingleStatCard";
import LeadsSourcesCard from "@/components/DashboardComponents/Cards/LeadsSourcesCard";
import TeamActivityCard from "@/components/DashboardComponents/Cards/TeamActivityCard";
import LeadStagesCard from "@/components/DashboardComponents/Cards/LeadStagesCard";

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Dashboard">
        <>
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
            <SingleStatCard title="Total Number of Leads" stat={52} />
            <SingleStatCard title="Total Number of Leads" stat={52} />
            <SingleStatCard
              title="Total Number of Leads"
              stat={52}
              total={100}
            />
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
            <SingleStatCard title="Total Number of Leads" stat={52} />
            <SingleStatCard title="Total Number of Leads" stat={52} />
            <SingleStatCard title="Total Number of Leads" stat={52} />
            <SingleStatCard
              title="Total Number of Leads"
              stat={52}
              total={100}
            />
          </Box>
        </>
      </DashboardLayout>
    </main>
  );
}
