import { useTabsSelector } from "@/components/CustomComponents/CustomTabs";
import {
  FilterParams,
  ITableContext,
  SelectAllParams,
  TabChangeParams,
} from "@/shared/interfaces/Table";
import React, { createContext, useContext, useState } from "react";

const TableContext = createContext<any>({});
export const useTable = (): ITableContext => useContext(TableContext);
export const TableContextProvider = ({
  children,
  fetchDataFunction,
  loading,
  filterFunctions,
  identifier = "id",
}: {
  children: React.ReactNode;
  fetchDataFunction: () => void;
  loading?: boolean;
  filterFunctions?: [(sf: FilterParams) => void, () => void];
  identifier?: string;
}) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [paywallExceeded, setPaywallExceeded] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterParams>({
    label: "",
    value: [],
  });
  const { activeTab, handleTabChange } = useTabsSelector();
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
  const handleSelectAll = (params: SelectAllParams) => {
    if (params.checked && params.tableData)
      setSelected(params.tableData.map((data) => data[identifier]));
    else setSelected([]);
  };
  const handleDataFetch = () => {
    !paywallExceeded && fetchDataFunction();
  };
  const handleSetFilter = (sf: FilterParams) => {
    setSelectedFilters(sf);
    filterFunctions && filterFunctions[0](sf);
  };
  const handleClearFilter = () => {
    setSelectedFilters({ label: "", value: [] });
    filterFunctions && filterFunctions[1]();
  };

  const handlePaywallExceeded = (exceeded: boolean) => {
    setPaywallExceeded(exceeded);
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
        paywallExceeded,
        handlePaywallExceeded,
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
