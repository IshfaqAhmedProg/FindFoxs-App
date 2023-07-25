import React from "react";
import { Stack, Divider } from "@mui/material";

import { useTable } from "@/contexts/TableContext";
import CustomCheckbox from "../CustomComponents/CustomCheckbox";

interface Props {
  id: string;
  children: React.ReactNode;
}
export default function TablePrimaryItem({ id, children }: Props) {
  const { selected, handleSelect } = useTable();
  return (
    <Stack
      minHeight="81px"
      justifyContent="space-between"
      pt={2}
      ml={1}
      mt={"1px"}
      minWidth="20ch"
      borderRadius={"var(--border-radius) 0 0 var(--border-radius) "}
      sx={
        selected.includes(id)
          ? {
              background: "var(--graylighter)",
              transition: "all 0.1s ease-in-out",
              ":hover": {
                background: "var(--graylightest)",
              },
            }
          : {
              transition: "all 0.1s ease-in-out",
              ":hover": {
                background: "var(--graylightest)",
              },
            }
      }
    >
      <Stack direction="row" alignItems="center" gap={2} width={"100%"}>
        <CustomCheckbox
          checked={selected.includes(id)}
          onChange={(e, checked) => handleSelect(id)}
        />
        {children}
      </Stack>
      <Divider sx={{ ml: 12 }} />
    </Stack>
  );
}
