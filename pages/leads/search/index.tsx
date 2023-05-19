import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import {
  CardHeader,
  Card,
  CardContent,
  Divider,
  Pagination,
  Stack,
  Chip,
} from "@mui/material";
import createRandomLeadArray from "@/shared/functions/createRandomLead";
import TableContainer from "@/components/TableComponent/TableContainer";
import { Leads } from "@/shared/interfaces/Leads";
import TableFilter from "@/components/TableComponent/TableFilter";
export default function SearchLeads() {
  const [page, setPage] = useState(1);
  const [leads, setLeads] = useState<Array<Leads>>([]);
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }
  useEffect(() => {
    if (leads.length == 0) {
      setLeads(createRandomLeadArray(8));
    }
  }, []);
  const SearchTypeSelector = () => {
    return (
      <Stack direction="row" gap={2}>
        <Chip label="Individual" />
        <Chip label="Company" />
      </Stack>
    );
  };
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Search Leads">
        <Card>
          <CardHeader
            title="Search for"
            action={<SearchTypeSelector />}
            sx={{ "& div:first-child": { flex: "0 1 auto", pr: 1 } }}
          />
          <Divider />
          <CardContent
            sx={{
              overflowY: "auto",
              padding: 0,
              height: "100%",
              ":last-child": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 0,
              },
            }}
          >
            <TableFilter />
            <TableContainer contentArray={leads} />
            <Stack alignItems="center">
              <Pagination count={10} page={page} onChange={handlePageChange} />
            </Stack>
          </CardContent>
        </Card>
      </DashboardLayout>
    </main>
  );
}
