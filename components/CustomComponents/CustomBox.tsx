import Box, { BoxProps } from "@mui/material/Box";
import React from "react";

type CustomBoxProps = {
  variant?: "inner" | "outer";
  stack?: boolean;
  row?: boolean;
} & BoxProps;
export default function CustomBox({
  children,
  variant,
  stack,
  row,
  ...boxProps
}: CustomBoxProps) {
  return (
    <Box
      borderRadius={"var(--border-radius)"}
      boxShadow={
        variant == "outer"
          ? "var(--box-shadow)"
          : variant == "inner"
          ? "inset var(--box-shadow)"
          : undefined
      }
      display={stack ? "flex" : "block"}
      flexDirection={row ? "row" : "column"}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
