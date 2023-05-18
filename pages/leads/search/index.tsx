import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import { Box, Pagination, Stack } from "@mui/material";
import createRandomLeadArray, {
  Leads,
} from "@/shared/functions/createRandomLead";
import LeadsListItem from "@/components/SearchLeadsComponents/LeadsListItem";
export default function SearchLeads() {
  const [page, setPage] = useState(1);
  const [leads, setLeads] = useState<Array<Leads>>(createRandomLeadArray);
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }
  console.log(leads);
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Search Leads">
        <Stack>
          {leads.map((lead) => {
            return <LeadsListItem key={lead._id} lead={lead} />;
          })}
        </Stack>
        <Box position="absolute" bottom="5%" left="50%">
          <Pagination count={10} page={page} onChange={handlePageChange} />
        </Box>
      </DashboardLayout>
    </main>
  );
}
