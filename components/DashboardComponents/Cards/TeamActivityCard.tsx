import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DashboardCardsLayout from "./DashboardCardsLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};
const labels = ["February"];
export const data = {
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
export default function TeamActivityCard() {
  return (
    <DashboardCardsLayout minHeight="748px" title="Team Activity">
      <Bar options={options} data={data} />
    </DashboardCardsLayout>
  );
}
