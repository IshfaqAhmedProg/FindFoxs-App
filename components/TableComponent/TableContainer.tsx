import React from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import TablePrimaryItem from "./TablePrimaryItem";
import TableItem from "./TableItem";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import { Leads } from "@/shared/interfaces/Leads";
interface Props {
  contentArray: Array<Leads>;
}
export const TableCell = ({
  children,
  type = "cell",
}: {
  children: any;
  type?: "cell" | "head";
}) => {
  return (
    <Box
      minWidth="20ch"
      width="20ch"
      maxWidth="20ch"
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

export default function TableContainer({ contentArray }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Stack gap={1.5} pt={2}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <TableCell type="head">Name</TableCell>
          {/* <FormControlLabel
            label="select all"
            control={<CustomCheckbox />}
            sx={{ "& span": { fontSize: "11px" } }}
          /> */}
        </Stack>
        {contentArray.map((content) => {
          return <TablePrimaryItem key={content._id} content={content} />;
        })}
      </Stack>
      <Stack
        width="80%"
        boxShadow="inset var(--box-shadow)"
        borderRadius="var(--border-radius)"
        sx={{ overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }}
        position="relative"
        pt={2}
        gap={1.5}
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
