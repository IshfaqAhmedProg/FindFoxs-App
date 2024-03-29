import React from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TableCell from "./TableCell";
import { useTable } from "@/contexts/TableContext";
import { InView } from "react-intersection-observer";
import Loading from "../CustomComponents/Loading/Loading";
import TableEndOfPage from "./TableEndOfPage";
import { ITableContainer } from "@/shared/interfaces/Table";

export default function TableContainer({
  primaryKey,
  primaryItems,
  secondaryKeys,
  secondaryItems,
  paywallComponent,
}: ITableContainer) {
  const theme = useTheme();
  const { handleDataFetch, loading, paywallExceeded } = useTable();

  //to keep the sidebar toggled when screen is big
  return (
    <Stack sx={{ overflowY: "auto" }} height={"100%"}>
      <Box display="flex" id="TableContainer" justifyContent="center">
        <Stack
          pt={2}
          width={
            useMediaQuery(theme.breakpoints.down("sm")) ? "100%" : "inherit"
          }
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? <Loading /> : <TableEndOfPage primary={primaryKey} />}
          </InView>
        </Stack>
        <Stack
          display={
            useMediaQuery(theme.breakpoints.down("sm")) ? "none" : "block"
          }
          width="80%"
          boxShadow="inset var(--box-shadow)"
          borderRadius="var(--border-radius)"
          height={"fit-content"}
          sx={{ overflowX: "auto", whiteSpace: "nowrap", overflowY: "hidden" }}
          position="relative"
          py={2}
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
      {paywallExceeded && (
        <Stack
          // position={"absolute"}
          // bottom={"0"}
          // left={"0"}
          className="paywall"
          // bgcolor={"red"}
          width={"100%"}
          height={"fit-content"}
          mt={"-80px"}
          zIndex={5}
        >
          {paywallComponent}
        </Stack>
      )}
    </Stack>
  );
}
