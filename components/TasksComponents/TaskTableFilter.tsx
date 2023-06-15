import React from "react";
import CustomTextInput from "../CustomComponents/CustomTextInput";
import CustomButton from "../CustomComponents/CustomButton";
import { LeadAction } from "@/shared/interfaces/Lead";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
const TasksTableFilters: Array<LeadAction> = [
  {
    title: "Tool",
    icon: <ConstructionRoundedIcon />,
  },
  { title: "Date/Time", icon: <AccessTimeFilledRoundedIcon /> },
  { title: "Query", icon: <QueryStatsRoundedIcon /> },
  { title: "Status", icon: <MonitorHeartRoundedIcon /> },
];
export default function TaskTableFilter() {
  return (
    <>
      <CustomTextInput placeholder="Search by Id" />
      {TasksTableFilters.map((filter) => {
        return (
          <CustomButton
            key={filter.title}
            kind="plain"
            buttonProps={{
              startIcon: filter.icon,
              sx: { color: "var(--graylight)" },
            }}
          >
            {filter.title}
          </CustomButton>
        );
      })}
    </>
  );
}
