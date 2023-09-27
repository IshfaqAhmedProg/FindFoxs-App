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
      borderRadius={"var(--border-radius)"}
      boxShadow={
        variant == "outer"
          ? "var(--box-shadow)"
          : variant == "inner"
          ? "inset var(--box-shadow)"
          : undefined
      }
      {...boxProps}
    >
      {children}
    </Box>
  );
}
