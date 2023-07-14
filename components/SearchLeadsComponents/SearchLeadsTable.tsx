import React, { useState, useEffect, Suspense } from "react";
import createRandomLeadArray from "@/shared/functions/createRandomLead";
import {
  Lead,
  leadPublicFields,
  leadSearchTabs,
} from "@/shared/interfaces/Lead";
import SearchLeadsPrimaryItem from "@/components/SearchLeadsComponents/SearchLeadsPrimaryItem";
import TablePrimaryItem from "@/components/TableComponents/TablePrimaryItem";
import TableItem from "@/components/TableComponents/TableItem";
import SearchLeadsTableSecondaryItem from "@/components/SearchLeadsComponents/SearchLeadsTableSecondaryItem";
import TableMain from "@/components/TableComponents/TableMain";
import SearchLeadsFilter from "@/components/SearchLeadsComponents/SearchLeadsFilter";
import SearchLeadsSelectAction from "@/components/SearchLeadsComponents/SearchLeadsSelectAction";
import { useTable } from "@/contexts/TableContext";
import { CircularProgress, Stack } from "@mui/material";

export default function SearchLeadsTable({ leads }: { leads: Array<Lead> }) {
  const [loading, setLoading] = useState<boolean>(true);
  const { activeTab } = useTable();
  const tablePrimaryItems = (
    <>
      {leads.length != 0 &&
        leads.map((lead) => {
          return (
            <TablePrimaryItem key={lead._id} id={lead._id}>
              <SearchLeadsPrimaryItem content={lead} />
            </TablePrimaryItem>
          );
        })}
    </>
  );
  const tableSecondaryItems = (
    <>
      {leads.length != 0 &&
        leads.map((lead) => {
          return (
            <TableItem key={lead._id}>
              <SearchLeadsTableSecondaryItem content={lead} />
            </TableItem>
          );
        })}
    </>
  );

  return (
    <Suspense
      fallback={
        <Stack width="100%" justifyContent={"center"} alignItems={"center"}>
          <CircularProgress sx={{ color: "var(--graylight)" }} />
        </Stack>
      }
    >
      <TableMain
        tableTitle="Search for..."
        data={leads}
        primaryKey="Lead"
        primaryItems={tablePrimaryItems}
        secondaryItems={tableSecondaryItems}
        secondaryKeys={leadPublicFields}
        tableTabs={leadSearchTabs}
        filterComponent={<SearchLeadsFilter />}
        selectActionsComponent={<SearchLeadsSelectAction />}
      />
    </Suspense>
  );
}
