import {
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
  fetchDataFunction,
  loading,
}: {
  children: React.ReactNode;
  fetchDataFunction: () => void;
  loading?: boolean;
}) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("");
  const [seeMoreOpenAnchor, setSeeMoreOpenAnchor] =
    useState<null | HTMLElement>(null);
  const seeMoreOpen = Boolean(seeMoreOpenAnchor);
  function handleSeeMoreClick(event: React.MouseEvent<HTMLElement>) {
    setSeeMoreOpenAnchor(event.currentTarget);
  }
  function handleSeeMoreClose() {
    setSeeMoreOpenAnchor(null);
  }
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
  const handleDataFetch = () => {
    fetchDataFunction();
  };

  const handleTabChange = (params: handleTabChangeParams) => {
    setActiveTab(params.tab);
  };
  return (
    <TableContext.Provider
      value={{
        selected,
        loading,
        page,
        seeMoreOpen,
        activeTab,
        seeMoreOpenAnchor,
        handleTabChange,
        handleDataFetch,
        handleSelect,
        handleSelectAll,
        handleSeeMoreClick,
        handleSeeMoreClose,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
