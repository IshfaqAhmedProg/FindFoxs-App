import React from "react";
import {
  CardHeader,
  Card,
  CardContent,
  Divider,
  Pagination,
  Stack,
} from "@mui/material";
import CustomButton from "../CustomUIComponents/CustomButton";
import { LeadSearchType } from "@/shared/interfaces/Lead";

interface Props {
  searchTypes: Array<LeadSearchType>;
  active: LeadSearchType;
  handleTypeChange: (
    event: React.ChangeEvent<unknown>,
    type: LeadSearchType
  ) => void;
}
export default function SearchTypeSelector({
  searchTypes,
  active,
  handleTypeChange,
}: Props) {
  return (
    <Stack direction="row" gap={2}>
      {searchTypes.map((type) => (
        <CustomButton
          key={type}
          kind="plain"
          buttonProps={{
            sx:
              active == type
                ? { color: "var(--primary)" }
                : { color: "var(--graylight)" },
            onClick: (e) => handleTypeChange(e, type),
          }}
        >
          {type}
        </CustomButton>
      ))}
    </Stack>
  );
}
