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
} from "@mui/material";
import createRandomLeadArray from "@/shared/functions/createRandomLead";
import TableContainer from "@/components/TableComponent/TableContainer";
import { Lead } from "@/shared/interfaces/Lead";
import TableFilter from "@/components/TableComponent/TableFilter";
import CustomButton from "@/components/CustomUIComponents/CustomButton";

const searchTypes = ["Individual", "Company"];

export type SearchType = (typeof searchTypes)[number];
export interface CheckboxSelectAll {
  handleSelectAll: (checked: boolean) => void;
}
export interface CheckboxSelect {
  handleSelect: (id: string) => void;
}
export interface CheckboxSelected {
  selected: Array<string>;
}

export default function SearchLeads() {
  const [searchType, setSearchType] = useState<SearchType>("Individual");
  const [page, setPage] = useState(1);
  const [leads, setLeads] = useState<Array<Lead>>([]);
  const [selected, setSelected] = useState<Array<string>>([]);

  function handleSelect(id: string) {
    setSelected((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  }
  function handleSelectAll(checked: boolean) {
    if (checked) setSelected(leads.map((lead) => lead._id));
    else setSelected([]);
  }
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }
  function handleSearchTypeChange(
    event: React.ChangeEvent<unknown>,
    type: SearchType
  ) {
    setSearchType(type);
  }
  useEffect(() => {
    if (leads.length == 0) {
      setLeads(createRandomLeadArray(8));
    }
  }, [leads.length]);
  {
    console.log("selected", selected);
    console.log("leads", leads);
  }
  const SearchTypeSelector = () => {
    return (
      <Stack direction="row" gap={2}>
        {searchTypes.map((type) => (
          <CustomButton
            key={type}
            kind="plain"
            buttonProps={{
              sx:
                searchType == type
                  ? { color: "var(--primary)" }
                  : { color: "var(--graylight)" },
              onClick: (e) => handleSearchTypeChange(e, type),
            }}
          >
            {type}
          </CustomButton>
        ))}
      </Stack>
    );
  };
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <DashboardLayout title="Search Leads">
        <Card>
          <CardHeader title="Search for..." action={<SearchTypeSelector />} />
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
            <TableFilter
              handleSelectAll={handleSelectAll}
              selected={selected}
              totalElements={leads.length}
            />
            <TableContainer
              contentArray={leads}
              handleSelect={handleSelect}
              selected={selected}
            />
            <Stack alignItems="center">
              <Pagination count={10} page={page} onChange={handlePageChange} />
            </Stack>
          </CardContent>
        </Card>
      </DashboardLayout>
    </main>
  );
}
