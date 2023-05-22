import React from "react";
import {
  TextField,
  FormControlLabel,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import CustomCheckbox from "../CustomUIComponents/CustomCheckbox";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import CustomButton from "../CustomUIComponents/CustomButton";
import CustomTextInput from "../CustomUIComponents/CustomTextInput";
import { CheckboxSelectAll, CheckboxSelected } from "@/pages/leads/search";

const iconColor = { color: "var(--graylight)" };
const IndividualFilters = [
  {
    title: "Job Title",
    icon: <MilitaryTechOutlinedIcon sx={iconColor} />,
  },
  { title: "Company", icon: <ApartmentRoundedIcon sx={iconColor} /> },
  { title: "Location", icon: <PinDropRoundedIcon sx={iconColor} /> },
  { title: "Industry", icon: <FactoryRoundedIcon sx={iconColor} /> },
];
interface Props extends CheckboxSelectAll, CheckboxSelected {
  totalElements: number;
}
export default function TableFilter({
  handleSelectAll,
  selected,
  totalElements,
}: Props) {
  return (
    <Stack direction="row" minHeight="54px" alignItems={"center"} gap={5}>
      <FormControlLabel
        label="select all"
        control={
          <CustomCheckbox
            onChange={(e, checked) => handleSelectAll(checked)}
            indeterminate={
              selected.length > 0 && selected.length < totalElements
            }
            checked={selected.length == totalElements}
          />
        }
        sx={{ "& span": { color: "var(--graylight)", fontSize: "11px" } }}
      />
      <Stack direction="row" alignItems={"center"} gap={2}>
        <Typography>Filters:</Typography>
        <CustomTextInput placeholder="Name(optional)" />
        {IndividualFilters.map((filter) => {
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
    </Stack>
  );
}
