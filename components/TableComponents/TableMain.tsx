import React, { useState } from "react";
import {
  CardHeader,
  Card,
  CardContent,
  Divider,
  Pagination,
  Stack,
} from "@mui/material";
import TableContainer from "@/components/TableComponents/TableContainer";
import { LeadSearchType, leadPublicFields } from "@/shared/interfaces/Lead";
import TableFilter from "@/components/TableComponents/TableFilter";
import SearchTypeSelector from "../SearchLeadsComponents/SearchTypeSelector";
import { useTable } from "@/contexts/TableContext";
import SearchLeadsFilter from "../SearchLeadsComponents/SearchLeadsFilter";

interface Props {
  tableTitle: string;
  data: Array<any>;
  primaryItems: React.ReactElement;
  secondaryItems: React.ReactElement;
  searchTypes: Array<LeadSearchType | any>;
}

export default function TableMain({
  tableTitle,
  data,
  primaryItems,
  secondaryItems,
  searchTypes,
}: Props) {
  const [searchType, setSearchType] = useState<string>(searchTypes[0]);
  const { page, handlePageChange } = useTable();
  function handleTypeChange(
    event: React.ChangeEvent<unknown>,
    type: LeadSearchType
  ) {
    setSearchType(type);
  }
  return (
    <Card>
      <CardHeader
        title={tableTitle}
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
        <TableFilter tableData={data} filter={<SearchLeadsFilter />} />
        <TableContainer
          primaryKey="Name"
          primaryItems={primaryItems}
          secondaryKeys={leadPublicFields}
          secondaryItems={secondaryItems}
        />
        <Stack alignItems="center">
          <Pagination count={10} page={page} onChange={handlePageChange} />
        </Stack>
      </CardContent>
    </Card>
  );
}
