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
import { LeadPublicFields } from "@/shared/interfaces/Lead";

const iconColor = { color: "var(--graylight)" };

interface Props extends CheckboxSelectAll, CheckboxSelected {
  totalElements: number;
  filters: LeadPublicFields;
}
export default function TableFilter({
  handleSelectAll,
  selected,
  totalElements,
  filters,
}: Props) {
  return (
    <Stack
      direction="row"
      minHeight="54px"
      alignItems={"center"}
      gap={5}
      ml={1}
    >
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
        {filters.map((filter) => {
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
