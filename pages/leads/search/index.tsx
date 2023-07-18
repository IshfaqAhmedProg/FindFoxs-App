import { TableContextProvider } from "@/contexts/TableContext";
import SearchLeadsTable from "@/components/SearchLeadsComponents/SearchLeadsTable";
import leads from "@/shared/data/MockLeads.json";
export default function SearchLeadsPage() {
  const fetchSize = 10;
  function fetchLeads() {
    console.log("fetchLeads");
  }
  return (
    <TableContextProvider fetchDataFunction={fetchLeads}>
      <SearchLeadsTable leads={leads} />
    </TableContextProvider>
  );
}
