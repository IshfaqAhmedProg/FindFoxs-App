import React from "react";
import TableMain from "../TableComponents/TableMain";
import TablePrimaryItem from "../TableComponents/TablePrimaryItem";
import TableItem from "../TableComponents/TableItem";
import TasksTableSecondaryItem from "./TasksTableSecondaryItem";
import TasksTablePrimaryItem from "./TasksTablePrimaryItem";
import TaskTableFilter from "./TaskTableFilter";
import { TableContextProvider } from "@/contexts/TableContext";
import useReadTasks from "@/shared/hooks/useReadTasks";
import TasksTableSelectAction from "./TasksTableSelectAction";
const queryLimit = 10;
export default function TasksTable() {
  const [
    tasks,
    loading,
    error,
    fetchMoreTasksFunction,
    handleSetFilter,
    handleClearFilter,
  ] = useReadTasks({
    queryLimit,
  });

  const tablePrimaryItems = (
    <>
      {tasks.length != 0 &&
        tasks.map((task) => {
          return (
            <TablePrimaryItem key={task._id} id={task._id}>
              <TasksTablePrimaryItem task={task} />
            </TablePrimaryItem>
          );
        })}
    </>
  );
  const tableSecondaryItems = (
    <>
      {tasks.length != 0 &&
        tasks.map((task) => {
          return (
            <TableItem key={task._id}>
              <TasksTableSecondaryItem task={task} />
            </TableItem>
          );
        })}
    </>
  );
  return (
    <TableContextProvider
      fetchDataFunction={fetchMoreTasksFunction}
      loading={loading}
      filterFunctions={[handleSetFilter, handleClearFilter]}
    >
      <TableMain
        tableTitle="All Tasks"
        tableData={tasks}
        primaryKey="Task"
        primaryItems={tablePrimaryItems}
        secondaryItems={tableSecondaryItems}
        secondaryKeys={[
          "Status",
          "Start time",
          "End time",
          "TTC",
          "Query count",
        ]}
        filterComponent={<TaskTableFilter />}
        selectActionsComponent={<TasksTableSelectAction />}
      />
    </TableContextProvider>
  );
}
