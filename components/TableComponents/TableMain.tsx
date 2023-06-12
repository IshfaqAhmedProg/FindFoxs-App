import React, { useEffect } from "react";
import {
  CardHeader,
  Card,
  CardContent,
  Divider,
  Pagination,
  Stack,
} from "@mui/material";
import TableContainer from "@/components/TableComponents/TableContainer";
import TableFilter from "@/components/TableComponents/TableFilter";
import TableTabsSelector from "./TableTabsSelector";
import { useTable } from "@/contexts/TableContext";
import { ITableMain } from "@/shared/interfaces/Table";

export default function TableMain({
  tableTitle = "",
  data,
  primaryKey = "",
  primaryComponent,
  secondaryComponents,
  secondaryKeys,
  tableTabs,
  filterComponent,
  selectActionsComponent,
}: ITableMain) {
  const { page, handlePageChange, handleTabChange, activeTab } = useTable();
  useEffect(() => {
    //setting the initially selected tab
    const tab = tableTabs[0];
    if (!activeTab) handleTabChange({ tab });
  }, [activeTab, handleTabChange, tableTabs]);
  return (
    <Card>
      <CardHeader
        title={tableTitle}
        action={<TableTabsSelector tableTabs={tableTabs} />}
        sx={{
          "& div:first-of-type": {
            flex: "0 1 auto",
          },
        }}
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
          selectActionsComponent={selectActionsComponent}
          tableData={data}
          filterComponent={filterComponent}
        />
        <TableContainer
          primaryKey={primaryKey}
          primaryComponent={primaryComponent}
          secondaryKeys={secondaryKeys}
          secondaryComponents={secondaryComponents}
        />
        <Stack mx={4} my={2}>
          <Pagination
            count={10}
            page={page}
            onChange={(e, page) => handlePageChange({ page })}
            shape="rounded"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
