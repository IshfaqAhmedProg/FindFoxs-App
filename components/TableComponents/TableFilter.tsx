import React, { useRef } from "react";
import { FormControlLabel, Stack, Slide } from "@mui/material";
import CustomCheckbox from "../CustomMUIComponents/CustomCheckbox";

import { useTable } from "@/contexts/TableContext";

interface Props {
  tableData: Array<any>;
  filterComponent: React.ReactElement;
  selectActionsComponent: React.ReactElement;
}
export default function TableFilter({
  tableData,
  filterComponent,
  selectActionsComponent,
}: Props) {
  const { handleSelectAll, selected } = useTable();
  const containerRef = useRef(null);
  return (
    <Stack
      direction="row"
      minHeight="54px"
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={5}
      mx={1}
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
      }}
      ref={containerRef}
    >
      <FormControlLabel
        label={
          selected.length == 0 ? "select all" : `selected ${selected.length}`
        }
        control={
          <CustomCheckbox
            onChange={(e, checked) => handleSelectAll({ checked, tableData })}
            indeterminate={
              selected.length > 0 && selected.length < tableData.length
            }
            checked={selected.length == tableData.length}
          />
        }
        sx={
          selected.length == 0
            ? { "& span": { color: "var(--graylight)", fontSize: "12px" } }
            : { "& span": { color: "var(--primarylight)", fontSize: "12px" } }
        }
      />

      {filterComponent && selected.length == 0 && (
        <Slide
          in={selected.length == 0}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <span>{filterComponent}</span>
        </Slide>
      )}
      {selectActionsComponent && selected.length > 0 && (
        <Slide
          in={selected.length > 0}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <span>{selectActionsComponent}</span>
        </Slide>
      )}
    </Stack>
  );
}
