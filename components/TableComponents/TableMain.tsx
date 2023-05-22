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
import { leadPublicFields } from "@/shared/interfaces/Lead";
import TableFilter from "@/components/TableComponents/TableFilter";
import SearchTypeSelector from "../SearchLeadsComponents/SearchTypeSelector";
import { useTable } from "@/contexts/TableContext";
import SearchLeadsFilter from "../SearchLeadsComponents/SearchLeadsFilter";
const searchTypes = ["Individual", "Company"];

export type SearchType = (typeof searchTypes)[number];

interface Props {
  tableTitle: string;
  data: Array<any>;
  primaryItems: React.ReactElement;
  secondaryItems: React.ReactElement;
}

export default function TableMain({
  tableTitle,
  data,
  primaryItems,
  secondaryItems,
}: Props) {
  const [searchType, setSearchType] = useState<SearchType>("Individual");
  const { page, handlePageChange } = useTable();
  function handleTypeChange(
    event: React.ChangeEvent<unknown>,
    type: SearchType
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
