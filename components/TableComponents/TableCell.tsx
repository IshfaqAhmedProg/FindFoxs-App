import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
export default function TableCell({
  children,
  type = "cell",
  fixedWidth = "20ch",
}: {
  children: any;
  type?: "cell" | "head";
  fixedWidth?: string;
}) {
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
}
