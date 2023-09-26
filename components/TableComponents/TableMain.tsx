import React from "react";
import TableContainer from "@/components/TableComponents/TableContainer";
import TableFilter from "@/components/TableComponents/TableFilter";
import CustomTabs, {
  useTabsSelector,
} from "../CustomComponents/CustomTabs";
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
  paywallComponent,
}: ITableMain) {
  const { activeTab, handleTabChange } = useTable();
  return (
    <CustomCard
      title={tableTitle}
      tabsComponent={
        tableTabs ? (
          <CustomTabs
            tabs={tableTabs}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
        ) : null
      }
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
        paywallComponent={paywallComponent}
      />
    </CustomCard>
  );
}
