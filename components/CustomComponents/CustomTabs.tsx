import convertToReadableString from "@/shared/functions/stringTransformers/convertToReadableString";
import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

interface Props {
  tabs: Array<string>;
  activeTab: number;
  handleTabChange: (event: React.SyntheticEvent, value: any) => void;
}
export function useTabsSelector(initialTab: number = 0) {
  const [activeTab, setActiveTab] = useState<number>(initialTab);
  function handleTabChange(e: React.SyntheticEvent, value: any) {
    setActiveTab(value);
  }
  return { activeTab, handleTabChange };
}
export default function CustomTabs({
  tabs,
  activeTab,
  handleTabChange,
}: Props) {
  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    >
      {tabs.map((tab) => (
        <Tab
          label={convertToReadableString(tab)}
          key={tab}
          sx={{ fontSize: "0.8em" }}
        />
      ))}
    </Tabs>
  );
}
