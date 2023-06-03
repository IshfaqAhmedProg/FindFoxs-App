import React, { useState, useEffect, Suspense } from "react";
import createRandomLeadArray from "@/shared/functions/createRandomLead";
import { Lead, leadSearchTabs } from "@/shared/interfaces/Lead";
import SearchLeadsPrimaryItem from "@/components/SearchLeadsComponents/SearchLeadsPrimaryItem";
import TablePrimaryItem from "@/components/TableComponents/TablePrimaryItem";
import TableItem from "@/components/TableComponents/TableItem";
import SearchLeadsTableItem from "@/components/SearchLeadsComponents/SearchLeadsTableItem";
import TableMain from "@/components/TableComponents/TableMain";
import SearchLeadsFilter from "@/components/SearchLeadsComponents/SearchLeadsFilter";
import SearchLeadsSelectAction from "@/components/SearchLeadsComponents/SearchLeadsSelectAction";
import { useTable } from "@/contexts/TableContext";
import { CircularProgress, Stack } from "@mui/material";

export default function SearchLeads() {
  const [leads, setLeads] = useState<Array<Lead>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { activeTab } = useTable();
  const tablePrimaryItem = (
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
              <SearchLeadsTableItem content={lead} />
            </TableItem>
          );
        })}
    </>
  );
  {
    console.log(leads);
  }
  useEffect(() => {
    if (leads.length == 0) {
      setLeads(createRandomLeadArray(8));
      setLoading(false);
    }
  }, [leads.length]);

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
        primaryKey="Name"
        primaryItems={tablePrimaryItem}
        secondaryItems={tableSecondaryItems}
        tableTabs={leadSearchTabs}
        filterComponent={<SearchLeadsFilter />}
        selectActionsComponent={<SearchLeadsSelectAction />}
      />
    </Suspense>
  );
}
