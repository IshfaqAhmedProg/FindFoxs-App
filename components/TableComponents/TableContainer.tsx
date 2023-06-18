import React, { useState } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TableCell from "./TableCell";
import { useTable } from "@/contexts/TableContext";
import { InView } from "react-intersection-observer";
import Loading from "../Loading/Loading";
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
  const { handleDataFetch, loading } = useTable();

  //to keep the sidebar toggled when screen is big
  return (
    <Box
      display="flex"
      id="TableContainer"
      justifyContent="center"
      sx={{ overflowY: "auto" }}
      height={"100%"}
    >
      <Stack
        pt={2}
        width={useMediaQuery(theme.breakpoints.down("sm")) ? "100%" : "inherit"}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <TableCell type="head">{primaryKey}</TableCell>
        </Stack>
        {primaryItems}
        <InView
          as="div"
          onChange={(inView, entry) => (inView ? handleDataFetch() : null)}
          style={{
            minWidth: "25ch",
            minHeight: "81px",
            position: "relative",
          }}
        >
          {loading && <Loading />}
        </InView>
      </Stack>
      <Stack
        display={useMediaQuery(theme.breakpoints.down("sm")) ? "none" : "block"}
        width="80%"
        boxShadow="inset var(--box-shadow)"
        borderRadius="var(--border-radius)"
        height={"fit-content"}
        sx={{ overflowX: "auto", whiteSpace: "nowrap", overflowY: "hidden" }}
        position="relative"
        pt={2}
      >
        <Stack direction="row" pl={2} gap={2} alignItems="center">
          {secondaryKeys?.map((key) => (
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
