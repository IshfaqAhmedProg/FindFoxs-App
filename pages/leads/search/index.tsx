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
import { Lead, LeadFilters } from "@/shared/interfaces/Lead";
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
import { TableContextProvider } from "@/contexts/TableContext";
import TableMain from "@/components/TableComponents/TableMain";
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
          />
        </TableContextProvider>
      </DashboardLayout>
    </main>
  );
}
