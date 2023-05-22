import React from "react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import TablePrimaryItem from "./TablePrimaryItem";
import TableItem from "./TableItem";
import { Lead } from "@/shared/interfaces/Lead";
import { CheckboxSelect, CheckboxSelected } from "@/pages/leads/search";

interface Props extends CheckboxSelect, CheckboxSelected {
  contentArray: Array<Lead>;
}
export const TableCell = ({
  children,
  type = "cell",
  fixedWidth = "20ch",
}: {
  children: any;
  type?: "cell" | "head";
  fixedWidth?: string;
}) => {
  return (
    <Box
      minWidth={fixedWidth}
      width={fixedWidth}
      maxWidth={fixedWidth}
      textOverflow="ellipsis"
      overflow="hidden"
    >
      {typeof children === "string" ? (
        <Tooltip title={children}>
          <Typography
            sx={
              type == "cell"
                ? { color: "var(--primarydark)" }
                : { fontSize: ".75rem" }
            }
            noWrap
          >
            {children}
          </Typography>
        </Tooltip>
      ) : (
        children
      )}
    </Box>
  );
};

export default function TableContainer({
  contentArray,
  handleSelect,
  selected,
}: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Stack pt={2}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <TableCell type="head">Name</TableCell>
        </Stack>
        {contentArray.map((content) => {
          return (
            <TablePrimaryItem
              key={content._id}
              selected={selected}
              content={content}
              handleSelect={handleSelect}
            />
          );
        })}
      </Stack>
      <Stack
        width="80%"
        boxShadow="inset var(--box-shadow)"
        borderRadius="var(--border-radius)"
        sx={{ overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }}
        position="relative"
        pt={2}
      >
        <Stack direction="row" pl={2} gap={2} alignItems="center">
          <TableCell type="head">Job Title</TableCell>
          <TableCell type="head">Company</TableCell>
          <TableCell type="head">Location</TableCell>
          <TableCell type="head">Industry and Keywords</TableCell>
        </Stack>
        {contentArray.map((content) => {
          return <TableItem key={content._id} content={content} />;
        })}
      </Stack>
    </Box>
  );
}
