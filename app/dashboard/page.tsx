import LeadConversionCard from "@/components/DashboardComponents/Cards/LeadConversionCard";
import TasksCard from "@/components/DashboardComponents/Cards/TasksCard";
import LeadsSourcesCard from "@/components/DashboardComponents/Cards/LeadsSourcesCard";
import TeamActivityCard from "@/components/DashboardComponents/Cards/TeamActivityCard";
import LeadStagesCard from "@/components/DashboardComponents/Cards/LeadStagesCard";
import CostsCard from "@/components/DashboardComponents/Cards/CostsCard";
import LeadsStatsCard from "@/components/DashboardComponents/Cards/LeadsStatsCard";

export default function Dashboard() {
  return (
    <>
      <LeadConversionCard />
      <TasksCard />
      <LeadsStatsCard />
      <LeadsSourcesCard />
      <TeamActivityCard />
      <LeadStagesCard />
      <CostsCard />
    </>
  );
}
