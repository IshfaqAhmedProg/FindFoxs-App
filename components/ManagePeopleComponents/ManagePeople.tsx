import CustomTabs, {
  useTabsSelector,
} from "@/components/CustomComponents/CustomTabs";
import CustomCard from "@components/CustomComponents/CustomCard";
import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import RecentlyAcquiredTable from "./RecentlyAcquired/RecentlyAcquiredTable";
import Analytics from "./Analytics";
import LeadsStages from "./LeadsStages/LeadsStages";
import { useRouter } from "next/router";

export default function ManagePeople() {
  const router = useRouter();
  const tab = router.query.tab;
  const tabs: {
    [key: string]: React.ReactNode;
  } = {
    recently_acquired: <RecentlyAcquiredTable />,
    leads_stages: <LeadsStages />,
    analytics: <Analytics />,
  };
  const tabArray = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    if (tab) setActiveTab(tabArray.indexOf(tab[0]));
  }, [tab]);
  return (
    <CustomCard
      title={"Manage People"}
      tabsComponent={
        <CustomTabs
          tabs={tabArray}
          activeTab={activeTab}
          handleTabChange={(e, value) => {
            router.push(`/people/manage/${tabArray[value]}`);
            setActiveTab(value);
          }}
        />
      }
    >
      <Stack
        width={"100%"}
        height={"100%"}
        overflow={"hidden"}
        py={1}
        px={1}
        mb={2}
      >
        {tabs[tabArray[activeTab]]}
      </Stack>
    </CustomCard>
  );
}
