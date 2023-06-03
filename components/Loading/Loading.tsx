import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Stack width="100%" justifyContent={"center"} alignItems={"center"}>
      <CircularProgress sx={{ color: "var(--graylight)" }} />
    </Stack>
  );
}
