import React, { createContext, useContext, useState, useEffect } from "react";
const TableContext = createContext<any>({});
export const useTable = () => useContext(TableContext);
export const TableContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState<Array<any>>([]);
  const handleTableData = (data: any) => {
    setTableData(data);
  };
  function handleSelect(id: string) {
    setSelected((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  }
  function handleSelectAll(checked: boolean) {
    if (checked) setSelected(tableData.map((data) => data._id));
    else setSelected([]);
  }
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }
  return (
    <TableContext.Provider
      value={{
        selected,
        page,
        tableData,
        handlePageChange,
        handleDataToSelect: handleTableData,
        handleSelect,
        handleSelectAll,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
