import React, { useState, useEffect } from "react";
import TableMain from "../TableComponents/TableMain";
import TablePrimaryItem from "../TableComponents/TablePrimaryItem";
import TableItem from "../TableComponents/TableItem";
import SearchLeadsSelectAction from "../SearchLeadsComponents/SearchLeadsSelectAction";
import TasksTableSecondaryItem from "./TasksTableSecondaryItem";
import TasksTablePrimaryItem from "./TasksTablePrimaryItem";
import TaskTableFilter from "./TaskTableFilter";
import { TableContextProvider } from "@/contexts/TableContext";
import { DataTypesSupported } from "@/shared/interfaces/Table";
import useFirestoreCollection from "@/shared/hooks/useFirestoreLoadMore";
export default function TasksTable() {
  const [tasks, setTasks] = useState<DataTypesSupported>([]);
  const uid = typeof window !== "undefined" && localStorage.getItem("uid");
  const [results, loading, error, fetchDataFunction] = useFirestoreCollection({
    collectionString: "tasks",
    whereObject: {
      fieldPath: "uid",
      opStr: "==",
      value: uid,
    },
    orderByObject: {
      fieldPath: "dateCreated",
      order: "desc",
    },
    fetchSize: 10,
  });
  useEffect(() => {
    if (results && Array.isArray(results)) {
      setTasks(results);
    }
  }, [results]);

  console.log("tasks", tasks);

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
      fetchDataFunction={fetchDataFunction}
      loading={loading}
    >
      <TableMain
        tableTitle="All Tasks"
        data={tasks}
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
        selectActionsComponent={<SearchLeadsSelectAction />}
      />
    </TableContextProvider>
  );
}
