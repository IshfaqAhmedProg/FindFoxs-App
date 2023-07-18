import SearchLeadsFilter from "@/components/SearchLeadsComponents/SearchLeadsFilter";
import SearchLeadsPrimaryItem from "@/components/SearchLeadsComponents/SearchLeadsPrimaryItem";
import SearchLeadsSelectAction from "@/components/SearchLeadsComponents/SearchLeadsSelectAction";
import SearchLeadsTableSecondaryItem from "@/components/SearchLeadsComponents/SearchLeadsTableSecondaryItem";
import TableItem from "@/components/TableComponents/TableItem";
import TableMain from "@/components/TableComponents/TableMain";
import TablePrimaryItem from "@/components/TableComponents/TablePrimaryItem";
import { useTable } from "@/contexts/TableContext";
import {
  Lead,
  leadPublicFields,
  leadSearchTabs,
} from "@/shared/interfaces/Lead";
import { CircularProgress, Stack } from "@mui/material";
import { Suspense, useState } from "react";

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
        tableData={leads}
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
