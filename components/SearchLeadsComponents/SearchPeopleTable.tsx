import SearchPeopleFilter from "@/components/SearchLeadsComponents/SearchPeopleFilter";
import SearchPeoplePrimaryItem from "@/components/SearchLeadsComponents/SearchPeoplePrimaryItem";
import SearchPeopleSecondaryItem from "@/components/SearchLeadsComponents/SearchPeopleSecondaryItem";
import SearchPeopleSelectAction from "@/components/SearchLeadsComponents/SearchPeopleSelectAction";
import TableItem from "@/components/TableComponents/TableItem";
import TableMain from "@/components/TableComponents/TableMain";
import TablePrimaryItem from "@/components/TableComponents/TablePrimaryItem";
import { TableContextProvider } from "@/contexts/TableContext";
import useGetCollection from "@/shared/hooks/useGetCollection";
import { Lead, leadPublicFields } from "@/shared/interfaces/Lead";
import { useEffect, useState } from "react";
import SearchPeoplePaywall from "./SearchPeoplePaywall";

export default function SearchPeopleTable() {
  const queryLimit = 10;
  const peopleSearchTabs = ["Individual", "Company"];
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

  const [people, setPeople] = useState<Array<Lead | undefined>>([]);
  useEffect(() => {
    if (results.length > 0) {
      setPeople(results as Array<Lead>);
    }
  }, [results]);
  const tablePrimaryItems = (
    <>
      {people.length != 0 &&
        people.map((lead) => {
          if (lead)
            return (
              <TablePrimaryItem key={lead._id} id={lead._id}>
                <SearchPeoplePrimaryItem content={lead} />
              </TablePrimaryItem>
            );
        })}
    </>
  );
  const tableSecondaryItems = (
    <>
      {people.length != 0 &&
        people.map((lead) => {
          if (lead)
            return (
              <TableItem key={lead._id}>
                <SearchPeopleSecondaryItem content={lead} />
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
        tableData={people}
        primaryKey="Lead"
        primaryItems={tablePrimaryItems}
        secondaryItems={tableSecondaryItems}
        secondaryKeys={leadPublicFields}
        tableTabs={peopleSearchTabs}
        filterComponent={<SearchPeopleFilter />}
        selectActionsComponent={<SearchPeopleSelectAction />}
        paywallComponent={<SearchPeoplePaywall />}
      />
    </TableContextProvider>
  );
}
