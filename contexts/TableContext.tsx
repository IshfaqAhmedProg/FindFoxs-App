import {
  Filter,
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
  filterFunctions,
}: {
  children: React.ReactNode;
  fetchDataFunction: () => void;
  loading?: boolean;
  filterFunctions: [(sf: Filter) => void, () => void];
}) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<Filter>({
    label: "",
    value: [],
  });
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
  const handleSetFilter = (sf: Filter) => {
    setSelectedFilters(sf);
    filterFunctions[0](sf);
  };
  const handleClearFilter = () => {
    setSelectedFilters({ label: "", value: [] });
    filterFunctions[1]();
  };
  const handleTabChange = (params: handleTabChangeParams) => {
    setActiveTab(params.tab);
  };
  return (
    <TableContext.Provider
      value={{
        selected,
        loading,
        seeMoreOpen,
        activeTab,
        seeMoreOpenAnchor,
        selectedFilters,
        handleSetFilter,
        handleClearFilter,
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
