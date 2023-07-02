import React from "react";
import { Typography } from "@mui/material";
export default function TableEndOfPage({ primary }: { primary: string }) {
  return (
    <Typography variant="h4" textAlign={"center"}>
      No more {primary}(s)
    </Typography>
  );
}
