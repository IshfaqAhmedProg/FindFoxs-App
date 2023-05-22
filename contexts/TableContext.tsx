import { Lead } from "@/shared/interfaces/Lead";
import React, { createContext, useContext, useState } from "react";

interface TableDataTypes extends Lead {}

const TableContext = createContext<any>({});
export const useTable = () => useContext(TableContext);
export const TableContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [page, setPage] = useState(1);

  function handleSelect(id: string) {
    setSelected((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  }
  const handleSelectAll = (
    checked: boolean,
    tableData: Array<TableDataTypes>
  ) => {
    if (checked) setSelected(tableData.map((data) => data._id));
    else setSelected([]);
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <TableContext.Provider
      value={{
        selected,
        page,
        handlePageChange,
        handleSelect,
        handleSelectAll,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
