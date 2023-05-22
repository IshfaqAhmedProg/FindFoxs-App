import React from "react";
import { Stack, Divider } from "@mui/material";

export default function TableItem({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      height="81px"
      justifyContent="space-between"
      width="100%"
      pt={2}
      gap={2}
    >
      <Stack direction="row" alignItems="center" gap={2} pl={2} mt={2}>
        {children}
      </Stack>
      <Divider />
    </Stack>
  );
}
