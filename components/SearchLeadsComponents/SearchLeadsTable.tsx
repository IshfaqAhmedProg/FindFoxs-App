import SearchLeadsFilter from "@/components/SearchLeadsComponents/SearchLeadsFilter";
import SearchLeadsPrimaryItem from "@/components/SearchLeadsComponents/SearchLeadsPrimaryItem";
import SearchLeadsSelectAction from "@/components/SearchLeadsComponents/SearchLeadsSelectAction";
import SearchLeadsSecondaryItem from "@/components/SearchLeadsComponents/SearchLeadsSecondaryItem";
import TableItem from "@/components/TableComponents/TableItem";
import TableMain from "@/components/TableComponents/TableMain";
import TablePrimaryItem from "@/components/TableComponents/TablePrimaryItem";
import { TableContextProvider } from "@/contexts/TableContext";
import useGetCollection from "@/shared/hooks/useGetCollection";
import {
  Lead,
  leadPublicFields,
  leadSearchTabs,
} from "@/shared/interfaces/Lead";
import { useEffect, useState } from "react";
import SearchLeadsPaywall from "./SearchLeadsPaywall";

const queryLimit = 10;
export default function SearchLeadsTable() {
  const [
    results,
    loading,
    error,
    fetchMoreLeadsFunction,
    handleSetFilter,
    handleClearFilter,
  ] = useGetCollection({
    queryLimit,
    coll: `leads`,
    includeAggr: true,
    aggrDoc: "aggregates/leads",
  });

  const [leads, setLeads] = useState<Array<Lead | undefined>>([]);
  useEffect(() => {
    if (results.length > 0) {
      setLeads(results as Array<Lead>);
    }
  }, [results]);
  const tablePrimaryItems = (
    <>
      {leads.length != 0 &&
        leads.map((lead) => {
          if (lead)
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
          if (lead)
            return (
              <TableItem key={lead._id}>
                <SearchLeadsSecondaryItem content={lead} />
              </TableItem>
            );
        })}
    </>
  );

  return (
    <TableContextProvider
      fetchDataFunction={fetchMoreLeadsFunction}
      loading={loading}
      identifier="_id"
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
        paywallComponent={<SearchLeadsPaywall />}
      />
    </TableContextProvider>
  );
}
