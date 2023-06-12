"use client";
import { TableContextProvider } from "@/contexts/TableContext";
import SearchLeads from "@/components/SearchLeadsComponents/SearchLeads";

export default async function SearchLeadsPage() {
  return (
    <TableContextProvider>
      <SearchLeads />
    </TableContextProvider>
  );
}
