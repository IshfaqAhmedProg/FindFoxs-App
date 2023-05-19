import React from "react";
import { FormControlLabel, Stack } from "@mui/material";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
export default function TableFilter() {
  return (
    <Stack direction="row" minHeight="54px">
      <FormControlLabel
        label="select all"
        control={<CustomCheckbox />}
        sx={{ "& span": { fontSize: "11px" } }}
      />
    </Stack>
  );
}
