import React, { useState, useEffect } from "react";
import {
  CardHeader,
  Card,
  CardContent,
  Divider,
  Pagination,
  Stack,
} from "@mui/material";
import TableContainer from "@/components/TableComponents/TableContainer";
import { LeadPublicFields } from "@/shared/interfaces/Lead";
import TableFilter from "@/components/TableComponents/TableFilter";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import SearchTypeSelector from "../SearchLeadsComponents/SearchTypeSelector";
import { useTable } from "@/contexts/TableContext";
const searchTypes = ["Individual", "Company"];

export type SearchType = (typeof searchTypes)[number];
export interface CheckboxSelectAll {
  handleSelectAll: (checked: boolean) => void;
}
export interface CheckboxSelect {
  handleSelect: (id: string) => void;
}
export interface CheckboxSelected {
  selected: Array<string>;
}

const iconColor = { color: "var(--graylight)" };
const LeadTablePublicValues: LeadPublicFields = [
  {
    title: "Job Title",
    icon: <MilitaryTechOutlinedIcon sx={iconColor} />,
  },
  { title: "Company", icon: <ApartmentRoundedIcon sx={iconColor} /> },
  { title: "Location", icon: <PinDropRoundedIcon sx={iconColor} /> },
  { title: "Industry", icon: <FactoryRoundedIcon sx={iconColor} /> },
];
export default function TableMain({ data }: { data: any }) {
  const [searchType, setSearchType] = useState<SearchType>("Individual");
  const {
    selected,
    page,
    tableData,
    handlePageChange,
    handleSelectAll,
    handleSelect,
  } = useTable();
  function handleTypeChange(
    event: React.ChangeEvent<unknown>,
    type: SearchType
  ) {
    setSearchType(type);
  }
  return (
    <Card>
      <CardHeader
        title="Search for..."
        action={
          <SearchTypeSelector
            searchTypes={searchTypes}
            active={searchType}
            handleTypeChange={handleTypeChange}
          />
        }
      />
      <Divider />
      <CardContent
        sx={{
          overflowY: "auto",
          padding: 0,
          height: "100%",
          ":last-child": {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 0,
          },
        }}
      >
        <TableFilter
          handleSelectAll={handleSelectAll}
          selected={selected}
          totalElements={tableData.length}
          filters={LeadTablePublicValues}
        />
        <TableContainer
          handleSelect={handleSelect}
          selected={selected}
          primaryKey="Name"
          primaryItems={tablePrimaryItem}
          visibleKeys={LeadTablePublicValues}
          visibleItems={tableVisibleItems}
        />
        <Stack alignItems="center">
          <Pagination count={10} page={page} onChange={handlePageChange} />
        </Stack>
      </CardContent>
    </Card>
  );
}
