import React from "react";
import { FormControlLabel, Stack } from "@mui/material";
import CustomCheckbox from "../CustomUIComponents/CustomCheckbox";

import { useTable } from "@/contexts/TableContext";

interface Props {
  tableData: Array<any>;
  filter: React.ReactElement;
}
export default function TableFilter({ tableData, filter }: Props) {
  const { handleSelectAll, selected } = useTable();

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
            onChange={(e, checked) => handleSelectAll(checked, tableData)}
            indeterminate={
              selected.length > 0 && selected.length < tableData.length
            }
            checked={selected.length == tableData.length}
          />
        }
        sx={{ "& span": { color: "var(--graylight)", fontSize: "11px" } }}
      />
      {filter}
    </Stack>
  );
}
