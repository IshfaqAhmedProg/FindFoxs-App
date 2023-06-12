import React, { useState } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
  const [toggleSecondary, setToggleSecondary] = useState<boolean>();
  //to keep the sidebar toggled when screen is big
  return (
    <Box display="flex" justifyContent="center">
      <Stack
        pt={2}
        width={useMediaQuery(theme.breakpoints.down("sm")) ? "100%" : "inherit"}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <TableCell type="head">{primaryKey}</TableCell>
        </Stack>
        {primaryItems}
      </Stack>
      <Stack
        display={useMediaQuery(theme.breakpoints.down("sm")) ? "none" : "block"}
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
