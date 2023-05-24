import { Lead, LeadSearchTabs } from "@/shared/interfaces/Lead";
import {
  DataTypesSupported,
  ITableContext,
  handlePageChangeParams,
  handleSelectAllParams,
  handleTabChangeParams,
} from "@/shared/interfaces/Table";
import React, { createContext, useContext, useState } from "react";

const TableContext = createContext<any>({});
export const useTable = (): ITableContext => useContext(TableContext);
export const TableContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("");

  function handleSelect(id: string) {
    setSelected((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  }
  const handleSelectAll = (params: handleSelectAllParams) => {
    if (params.checked) setSelected(params.tableData.map((data) => data._id));
    else setSelected([]);
  };
  const handlePageChange = (params: handlePageChangeParams) => {
    setPage(params.page);
  };

  const handleTabChange = (params: handleTabChangeParams) => {
    setActiveTab(params.tab);
  };
  return (
    <TableContext.Provider
      value={{
        selected,
        page,
        activeTab,
        handleTabChange,
        handlePageChange,
        handleSelect,
        handleSelectAll,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
