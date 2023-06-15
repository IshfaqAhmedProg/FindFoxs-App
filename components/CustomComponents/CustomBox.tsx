import Box, { BoxProps } from "@mui/material/Box";
import React from "react";

export default function CustomBox({
  children,
  variant = "outer",
  boxProps,
}: {
  children?: React.ReactNode;
  variant?: "inner" | "outer";
  boxProps?: BoxProps;
}) {
  return (
    <Box
      borderRadius={"var(--border-radius-large)"}
      boxShadow={
        variant == "outer" ? "var(--box-shadow)" : "inset var(--box-shadow)"
      }
      {...boxProps}
    >
      {children}
    </Box>
  );
}
