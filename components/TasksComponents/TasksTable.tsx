import React, { useEffect, useState } from "react";
import TableMain from "../TableComponents/TableMain";
import TablePrimaryItem from "../TableComponents/TablePrimaryItem";
import TableItem from "../TableComponents/TableItem";
import TasksTableSecondaryItem from "./TasksTableSecondaryItem";
import TasksTablePrimaryItem from "./TasksTablePrimaryItem";
import TaskTableFilter from "./TaskTableFilter";
import { TableContextProvider } from "@/contexts/TableContext";
import useGetCollection from "@/shared/hooks/useGetCollection";
import TasksTableSelectAction from "./TasksTableSelectAction";
import { useAuth } from "@/contexts/AuthContext";
import Task, { isTask } from "@/shared/interfaces/Tasks";
const queryLimit = 10;
export default function TasksTable() {
  const { user } = useAuth();
  const [
    results,
    loading,
    error,
    fetchMoreTasksFunction,
    handleSetFilter,
    handleClearFilter,
  ] = useGetCollection({
    queryLimit,
    coll: `users/${user?.uid}/tasks`,
  });
  const [tasks, setTasks] = useState<Array<Task | undefined>>([]);
  useEffect(() => {
    if (results.length > 0) {
      setTasks(results as Array<Task>);
    }
  }, [results]);
  const tablePrimaryItems = (
    <>
      {tasks &&
        tasks.map((task) => {
          if (isTask<Task>(task))
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
      {tasks &&
        tasks.map((task) => {
          if (isTask<Task>(task))
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
      identifier="_id"
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
