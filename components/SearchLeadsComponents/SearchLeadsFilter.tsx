import React from "react";
import CustomTextInput from "../CustomComponents/CustomTextInput";
import CustomButton from "../CustomComponents/CustomButton";
import { LeadAction } from "@/shared/interfaces/Lead";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";

const LeadTableFilters: Array<LeadAction> = [
  {
    title: "Job Title",
    icon: <MilitaryTechOutlinedIcon />,
  },
  { title: "Company", icon: <ApartmentRoundedIcon /> },
  { title: "Location", icon: <PinDropRoundedIcon /> },
  { title: "Industry", icon: <FactoryRoundedIcon /> },
];

export default function SearchLeadsFilter() {
  return (
    <>
      <CustomTextInput placeholder="Search by Name" />
      {LeadTableFilters.map((filter) => {
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
