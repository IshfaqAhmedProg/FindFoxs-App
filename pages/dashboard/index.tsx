import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import Cursor from "@/components/LandingComponents/Cursor";
import styles from "@/styles/Home.module.css";
import LeadConversionCard from "@/components/DashboardComponents/Cards/LeadConversionCard";
import TasksCard from "@/components/DashboardComponents/Cards/TasksCard";
import { Box, Grid } from "@mui/material";
import SingleStatCard from "@/components/DashboardComponents/Cards/SingleStatCard";
import CurrentMonthLeadsSourcesCard from "@/components/DashboardComponents/Cards/CurrentMonthLeadsSourcesCard";
import TeamActivityCard from "@/components/DashboardComponents/Cards/TeamActivityCard";
import LeadStagesCard from "@/components/DashboardComponents/Cards/LeadStagesCard";
type PieData = {
  color: string;
  value: number;
  key?: string | number;
  title?: string | number;
  [key: string]: any;
}[];
export default function Dashboard() {
  const dataMock: PieData = [
    { title: "Google", value: 55, color: "#5467E4" },
    { title: "LinkedIn", value: 20, color: "#5467E4" },
    { title: "Facebook", value: 20, color: "#5467E4" },
    { title: "Others", value: 5, color: "#5467E4" },
  ];

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
          <CurrentMonthLeadsSourcesCard data={dataMock} />
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
