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
import { SearchType } from "../TableComponents/TableMain";

interface Props {
  searchTypes: Array<SearchType>;
  active: SearchType;
  handleTypeChange: (
    event: React.ChangeEvent<unknown>,
    type: SearchType
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
