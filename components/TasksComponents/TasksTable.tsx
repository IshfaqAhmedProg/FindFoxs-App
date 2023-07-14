import React, { useState, useEffect } from "react";
import TableMain from "../TableComponents/TableMain";
import TablePrimaryItem from "../TableComponents/TablePrimaryItem";
import TableItem from "../TableComponents/TableItem";
import SearchLeadsSelectAction from "../SearchLeadsComponents/SearchLeadsSelectAction";
import TasksTableSecondaryItem from "./TasksTableSecondaryItem";
import TasksTablePrimaryItem from "./TasksTablePrimaryItem";
import TaskTableFilter, { ITaskTableFilter } from "./TaskTableFilter";
import { TableContextProvider } from "@/contexts/TableContext";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/config";
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  QueryFieldFilterConstraint,
} from "firebase/firestore";
import useFirestoreCollection from "@/shared/hooks/useFirestoreCollection";
import { Filter } from "@/shared/interfaces/Table";
const queryLimit = 10;
export default function TasksTable() {
  const [
    tasks,
    loading,
    error,
    fetchMoreTasksFunction,
    handleSetFilter,
    handleClearFilter,
  ] = useFirestoreCollection({
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
