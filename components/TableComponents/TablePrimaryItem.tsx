import React from "react";
import { Stack, Divider } from "@mui/material";

import { Lead } from "@/shared/interfaces/Lead";

import { useTable } from "@/contexts/TableContext";

interface Props {
  content: Lead;
  children: React.ReactElement;
}
export default function TablePrimaryItem({ content, children }: Props) {
  const { selected } = useTable();
  return (
    <>
      <Stack
        height="81px"
        justifyContent="space-between"
        pt={2}
        ml={1}
        gap={2}
        sx={
          selected.includes(content._id)
            ? {
                background: "var(--graylighter)",
                borderRadius: "var(--border-radius) 0 0 var(--border-radius) ",
                transition: "all 0.1s ease-in-out",
              }
            : {
                background: "transparent",
                borderRadius: 0,
                transition: "all 0.1s ease-in-out",
              }
        }
      >
        {children}
        <Divider sx={{ ml: 12 }} />
      </Stack>
    </>
  );
}
