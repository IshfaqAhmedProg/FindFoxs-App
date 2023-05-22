import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import createRandomLeadArray from "@/shared/functions/createRandomLead";
import { Lead, leadSearchTypes } from "@/shared/interfaces/Lead";
import LeadPrimaryItem from "@/components/SearchLeadsComponents/LeadPrimaryItem";
import TablePrimaryItem from "@/components/TableComponents/TablePrimaryItem";
import TableItem from "@/components/TableComponents/TableItem";
import LeadTableItem from "@/components/SearchLeadsComponents/LeadTableItem";
import { TableContextProvider } from "@/contexts/TableContext";
import TableMain from "@/components/TableComponents/TableMain";

export default function SearchLeads() {
  const [leads, setLeads] = useState<Array<Lead>>([]);
  const tablePrimaryItem = (
    <>
      {leads.length != 0 &&
        leads.map((lead) => {
          return (
            <TablePrimaryItem key={lead._id} content={lead}>
              <LeadPrimaryItem content={lead} />
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
              <LeadTableItem content={lead} />
            </TableItem>
          );
        })}
    </>
  );

  useEffect(() => {
    if (leads.length == 0) {
      setLeads(createRandomLeadArray(8));
    }
  }, [leads.length]);

  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Search Leads">
        <TableContextProvider>
          <TableMain
            tableTitle="Search for..."
            data={leads}
            primaryItems={tablePrimaryItem}
            secondaryItems={tableSecondaryItems}
            searchTypes={leadSearchTypes}
          />
        </TableContextProvider>
      </DashboardLayout>
    </main>
  );
}
