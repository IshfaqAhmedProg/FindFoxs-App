import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import CustomCard from "../CustomComponents/CustomCard";

export default function ManageLeads() {
  const [selectedTab, setSelectedTab] = useState();
  const tabs = [
    "Acquired People",
    "Leads Stages",
    "Leads Stages",
    "Leads Stages",
  ];
  function handleTabChange(event: React.SyntheticEvent, tab: any) {
    setSelectedTab(tab);
  }
  return (
    <CustomCard title={"Manage your leads"}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
        centered
      >
        {tabs.map((tab) => (
          <Tab label={tab} key={tab} />
        ))}
      </Tabs>
    </CustomCard>
  );
}
