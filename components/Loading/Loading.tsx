import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Stack
      width="100%"
      justifyContent={"center"}
      alignItems={"center"}
      position={"absolute"}
      top={"50%"}
      left={"50%"}
      sx={{ transform: "translate(-50%,-50%)" }}
    >
      <CircularProgress sx={{ color: "var(--graylight)" }} />
    </Stack>
  );
}
