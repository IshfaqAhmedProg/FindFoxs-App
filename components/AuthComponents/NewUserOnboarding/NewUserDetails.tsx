import React from "react";
import { Typography } from "@mui/material";
export default function NewUserDetails({
  page,
}: {
  page: string | string[] | undefined;
}) {
  return (
    <>
      <Typography variant="h4">Before you get started</Typography>
      <Typography variant="h4">Verify your email</Typography>
    </>
  );
}
