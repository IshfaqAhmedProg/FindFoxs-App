import React from "react";
import { Box, Stack } from "@mui/material";
import { LeadPublicFields } from "@/shared/interfaces/Lead";
import { CheckboxSelect, CheckboxSelected } from "@/pages/leads/search";
import TableCell from "./TableCell";

interface Props extends CheckboxSelect, CheckboxSelected {
  primaryKey: string;
  visibleKeys: LeadPublicFields | Array<any>;
  primaryItems: React.ReactElement;
  visibleItems: React.ReactElement;
}

export default function TableContainer({
  primaryKey,
  primaryItems,
  visibleKeys,
  visibleItems,
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
          {visibleKeys.map((key) => (
            <TableCell key={key.title} type="head">
              {key.title}
            </TableCell>
          ))}
        </Stack>
        {visibleItems}
      </Stack>
    </Box>
  );
}
