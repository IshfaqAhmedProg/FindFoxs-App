import React, { useRef } from "react";
import {
  FormControlLabel,
  Stack,
  Chip,
  Slide,
  Typography,
} from "@mui/material";
import CustomCheckbox from "../CustomComponents/CustomCheckbox";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useTable } from "@/contexts/TableContext";
import CustomButton from "../CustomComponents/CustomButton";
import { ITableFilter } from "@/shared/interfaces/Table";

export default function TableFilter({
  tableData,
  filterComponent,
  selectActionsComponent,
}: ITableFilter) {
  const { handleSelectAll, selected, selectedFilters, handleClearFilter } =
    useTable();
  const containerRef = useRef(null);
  return (
    <>
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
              checked={
                selected.length == tableData.length && selected.length != 0
              }
            />
          }
          sx={
            selected.length == 0
              ? { "& span": { color: "var(--graylight)", fontSize: "12px" } }
              : {
                  "& span": {
                    color: "var(--primarylight)",
                    fontSize: "12px",
                  },
                }
          }
        />

        {filterComponent && selected.length == 0 && (
          <Slide
            in={selected.length == 0}
            mountOnEnter
            unmountOnExit
            container={containerRef.current}
          >
            <span>
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"center"}
                minWidth={"622px"}
                width={"100%"}
                gap={1}
              >
                <Typography>Filters:</Typography>
                {filterComponent}
              </Stack>
            </span>
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
      {selectedFilters.label != "" && (
        <Stack direction="row" alignItems={"center"} gap={2} mx={2} mb={1}>
          <Typography>Filtering by {selectedFilters.label}:</Typography>
          <Stack direction={"row"} gap={1}>
            {selectedFilters.value.map((val) => {
              return <Chip key={val} label={val} size="small" />;
            })}
          </Stack>
          <CustomButton
            kind="icon"
            iconButtonProps={{
              sx: {
                "& .MuiSvgIcon-root": {
                  color: "var(--graylight)",
                },
                width: "25px",
                height: "25px",
              },
              onClick: (e) => handleClearFilter(),
            }}
          >
            <ClearRoundedIcon />
          </CustomButton>
        </Stack>
      )}
    </>
  );
}
