import React, { useEffect } from "react";
import TableContainer from "@/components/TableComponents/TableContainer";
import TableFilter from "@/components/TableComponents/TableFilter";
import TableTabsSelector from "./TableTabsSelector";
import { useTable } from "@/contexts/TableContext";
import { ITableMain } from "@/shared/interfaces/Table";
import CustomCard from "../CustomComponents/CustomCard";

export default function TableMain({
  tableTitle = "",
  tableData,
  primaryKey = "",
  primaryItems,
  secondaryKeys,
  secondaryItems,
  tableTabs,
  filterComponent,
  selectActionsComponent,
}: ITableMain) {
  const { handleTabChange, activeTab } = useTable();
  useEffect(() => {
    //setting the initially selected tab
    if (tableTabs) {
      const tab = tableTabs[0];
      if (!activeTab) handleTabChange({ tab });
    }
  }, [activeTab, handleTabChange, tableTabs]);
  return (
    <CustomCard
      title={tableTitle}
      action={tableTabs ? <TableTabsSelector tableTabs={tableTabs} /> : null}
    >
      <TableFilter
        selectActionsComponent={selectActionsComponent}
        tableData={tableData}
        filterComponent={filterComponent}
      />
      <TableContainer
        primaryKey={primaryKey}
        primaryItems={primaryItems}
        secondaryKeys={secondaryKeys}
        secondaryItems={secondaryItems}
      />
    </CustomCard>
  );
}
