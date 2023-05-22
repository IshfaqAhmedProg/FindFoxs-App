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
import TableContainer from "@/components/TableComponents/TableContainer";
import { Lead, LeadPublicFields } from "@/shared/interfaces/Lead";
import TableFilter from "@/components/TableComponents/TableFilter";
import CustomButton from "@/components/CustomUIComponents/CustomButton";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import LeadPrimaryItem from "@/components/SearchLeadsComponents/LeadPrimaryItem";
import TablePrimaryItem from "@/components/TableComponents/TablePrimaryItem";
import TableItem from "@/components/TableComponents/TableItem";
import LeadTableItem from "@/components/SearchLeadsComponents/LeadTableItem";
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

const iconColor = { color: "var(--graylight)" };
const LeadTablePublicValues: LeadPublicFields = [
  {
    title: "Job Title",
    icon: <MilitaryTechOutlinedIcon sx={iconColor} />,
  },
  { title: "Company", icon: <ApartmentRoundedIcon sx={iconColor} /> },
  { title: "Location", icon: <PinDropRoundedIcon sx={iconColor} /> },
  { title: "Industry", icon: <FactoryRoundedIcon sx={iconColor} /> },
];
export default function SearchLeads() {
  const [searchType, setSearchType] = useState<SearchType>("Individual");
  const [page, setPage] = useState(1);
  const [leads, setLeads] = useState<Array<Lead>>([]);
  const [selected, setSelected] = useState<Array<string>>([]);
  const tablePrimaryItem = (
    <>
      {leads.map((lead) => {
        return (
          <TablePrimaryItem key={lead._id} selected={selected} content={lead}>
            <LeadPrimaryItem
              content={lead}
              selected={selected}
              handleSelect={handleSelect}
            />
          </TablePrimaryItem>
        );
      })}
    </>
  );
  const tableVisibleItems = (
    <>
      {leads.map((lead) => {
        return (
          <TableItem key={lead._id}>
            <LeadTableItem content={lead} />
          </TableItem>
        );
      })}
    </>
  );
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
              filters={LeadTablePublicValues}
            />
            <TableContainer
              handleSelect={handleSelect}
              selected={selected}
              primaryKey="Name"
              primaryItems={tablePrimaryItem}
              visibleKeys={LeadTablePublicValues}
              visibleItems={tableVisibleItems}
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
