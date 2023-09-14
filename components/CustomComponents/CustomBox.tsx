import Box, { BoxProps } from "@mui/material/Box";
import React from "react";

type CustomBoxProps = {
  variant?: "inner" | "outer";
} & BoxProps;
export default function CustomBox({
  children,
  variant,
  ...boxProps
}: CustomBoxProps) {
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
