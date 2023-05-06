import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DashboardCardsLayout from "./DashboardCardsLayout";
import { Stack, Typography, AvatarGroup, Avatar, Tooltip } from "@mui/material";
import Stats, { Stat } from "@/shared/interfaces/Stats";
import SingleStatSmall from "@/components/DisplayStats/SingleStatSmall";
import SingleStatBig from "@/components/DisplayStats/SingleStatBig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};
const labels = ["this Month (February)"];
export const barChartData = {
  labels,
  datasets: [
    {
      label: "New Leads",
      data: [1200],
      backgroundColor: "rgba(3, 219,120, 1)",
    },
    {
      label: "Emails Sent",
      data: [120],
      backgroundColor: "rgba(84, 103, 228, 1)",
    },
    {
      label: "Calls Made",
      data: [545],
      backgroundColor: "rgba(48, 63, 159, 1)",
    },
    {
      label: "Converted To Satisfied",
      data: [258],
      backgroundColor: "rgba(19, 163, 134, 1)",
    },
  ],
};
const peopleOnlineData = [
  { name: "John Bradley", profileImage: "/Images/genericperson1.png" },
  { name: "John Bradley", profileImage: "/Images/genericperson1.png" },
  { name: "John Bradley", profileImage: "/Images/genericperson1.png" },
  { name: "John Bradley", profileImage: "/Images/genericperson1.png" },
];
const PeopleOnlineAvatars = (
  <AvatarGroup total={peopleOnlineData.length}>
    {peopleOnlineData.map((person, index) => {
      if (index < 3)
        return (
          <Tooltip key={index} title={person.name}>
            <Avatar alt={person.name} src={person.profileImage} />
          </Tooltip>
        );
    })}
  </AvatarGroup>
);
const statData: Array<Stats> = [
  {
    statTitle: "Most emails sent",
    statTitleTrailing: "this month",
    stats: [{ title: "John Bradley", stat: "80", statUnit: "emails" }],
  },
  {
    statTitle: "Most calls made",
    statTitleTrailing: "this month",
    stats: [
      { title: "John Bradley", stat: "80", statUnit: "calls" },
      { title: "Peter Petely", stat: "70", statUnit: "calls" },
      { title: "Weter Wetely", stat: "58", statUnit: "calls" },
    ],
  },
  {
    statTitle: "Most new leads added",
    statTitleTrailing: "this month",
    stats: [
      { title: "Peter Petely", stat: "70", statUnit: "leads" },
      { title: "Weter Wetely", stat: "58", statUnit: "leads" },
    ],
  },
];

export default function TeamActivityCard() {
  return (
    <DashboardCardsLayout minHeight="748px" title="Team Activity">
      <Stack gap={4} pt={3}>
        <Bar options={options} data={barChartData} updateMode="resize" />
        <Stack direction="row" justifyContent="space-between" paddingX={6}>
          <SingleStatBig
            title="Total Calls by team"
            statUnit="this month"
            stat="80"
          />
          <SingleStatBig
            title="Total Emails by team"
            statUnit="this month"
            stat="250"
          />
        </Stack>
        <Stack gap={2} paddingX={6}>
          {statData.map((stat) => {
            return <SingleStatSmall key={stat.statTitle} stat={stat} />;
          })}
          <Stack>
            <Typography variant="h5">Team members online</Typography>
            {PeopleOnlineAvatars}
          </Stack>
        </Stack>
      </Stack>
    </DashboardCardsLayout>
  );
}
