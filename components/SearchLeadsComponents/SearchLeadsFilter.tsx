import React from "react";
import { Stack, Typography } from "@mui/material";
import CustomTextInput from "../CustomMUIComponents/CustomTextInput";
import CustomButton from "../CustomMUIComponents/CustomButton";
import { LeadAction } from "@/shared/interfaces/Lead";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";

const LeadTablePublicValues: Array<LeadAction> = [
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
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent={"center"}
      minWidth={"622px"}
      width={"100%"}
      gap={1}
    >
      <Typography>Filters:</Typography>
      <CustomTextInput placeholder="Search by Name" />
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
