import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import { TableContextProvider } from "@/contexts/TableContext";
import SearchLeadsTable from "@/components/SearchLeadsComponents/SearchLeadsTable";
import leads from "@/shared/data/MockLeads.json";
export default function SearchLeadsPage() {
  const fetchSize = 10;
  function fetchLeads() {
    console.log("fetchLeads");
  }
  return (
    <main className={styles.dashboard}>
      <DashboardLayout>
        <TableContextProvider fetchDataFunction={fetchLeads}>
          <SearchLeadsTable leads={leads} />
        </TableContextProvider>
      </DashboardLayout>
    </main>
  );
}
