import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import { TableContextProvider } from "@/contexts/TableContext";
import SearchLeads from "@/components/SearchLeadsComponents/SearchLeads";

export default function SearchLeadsPage() {
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Search Leads">
        <TableContextProvider>
          <SearchLeads />
        </TableContextProvider>
      </DashboardLayout>
    </main>
  );
}
