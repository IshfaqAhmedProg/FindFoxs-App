import CustomTabs, {
  useTabsSelector
} from "@/components/CustomComponents/CustomTabs";
import CustomCard from "@components/CustomComponents/CustomCard";
import { Stack } from "@mui/material";
import React from "react";
import AcquiredPeopleTable from "./AcquiredPeople/AcquiredPeopleTable";
import Analytics from "./Analytics";
import CRMStages from "./CRMStages";

export default function ManagePeople() {
  const tabs: { [key: string]: React.ReactNode } = {
    "Acquired People": <AcquiredPeopleTable />,
    "CRM Stages": <CRMStages />,
    Analytics: <Analytics />,
  };
  const { activeTab, handleTabChange } = useTabsSelector();
  return (
    <CustomCard
      title={"Manage People"}
      tabsComponent={
        <CustomTabs
          tabs={Object.keys(tabs)}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
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
        {tabs[Object.keys(tabs)[activeTab]]}
      </Stack>
    </CustomCard>
  );
}
