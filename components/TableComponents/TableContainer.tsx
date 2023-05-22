import React from "react";
import { Box, Stack } from "@mui/material";
import { LeadFilters } from "@/shared/interfaces/Lead";
import TableCell from "./TableCell";

interface Props {
  primaryKey: string;
  secondaryKeys: Array<string>;
  primaryItems: React.ReactElement;
  secondaryItems: React.ReactElement;
}

export default function TableContainer({
  primaryKey,
  primaryItems,
  secondaryKeys,
  secondaryItems,
}: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Stack pt={2}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <TableCell type="head">{primaryKey}</TableCell>
        </Stack>
        {primaryItems}
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
          {secondaryKeys.map((key) => (
            <TableCell key={key} type="head">
              {key}
            </TableCell>
          ))}
        </Stack>
        {secondaryItems}
      </Stack>
    </Box>
  );
}
