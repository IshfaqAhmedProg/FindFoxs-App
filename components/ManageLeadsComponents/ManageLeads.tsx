import React, { useState } from "react";
import { Tab, Tabs, Stack } from "@mui/material";
import CustomCard from "../CustomComponents/CustomCard";
import CustomBox from "../CustomComponents/CustomBox";
import SearchLeadsTable from "../SearchLeadsComponents/SearchLeadsTable";

export default function ManageLeads() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["Acquired People", "CRM Stages", "Analytics"];
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
      <Stack
        width={"100%"}
        height={"93%"}
        alignItems={"center"}
        justifyContent={"center"}
        overflow={"hidden"}
        px={2}
        mb={2}
      >
        <CustomBox variant="inner" width={"100%"} height={"100%"} p={1}>
          <SearchLeadsTable />
        </CustomBox>
      </Stack>
    </CustomCard>
  );
}
