import React from "react";
import { Stack, Typography } from "@mui/material";
import CustomTextInput from "../CustomUIComponents/CustomTextInput";
import CustomButton from "../CustomUIComponents/CustomButton";
import { LeadFilters } from "@/shared/interfaces/Lead";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";

const iconColor = { color: "var(--graylight)" };
const LeadTablePublicValues: Array<LeadFilters> = [
  {
    title: "Job Title",
    icon: <MilitaryTechOutlinedIcon sx={iconColor} />,
  },
  { title: "Company", icon: <ApartmentRoundedIcon sx={iconColor} /> },
  { title: "Location", icon: <PinDropRoundedIcon sx={iconColor} /> },
  { title: "Industry", icon: <FactoryRoundedIcon sx={iconColor} /> },
];

export default function SearchLeadsFilter() {
  return (
    <Stack direction="row" alignItems={"center"} gap={2}>
      <Typography>Filters:</Typography>
      <CustomTextInput placeholder="Name(optional)" />
      {LeadTablePublicValues.map((filter) => {
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
    </Stack>
  );
}
