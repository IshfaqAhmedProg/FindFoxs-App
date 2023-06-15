import React, { useState } from "react";
import TableMain from "../TableComponents/TableMain";
import TablePrimaryItem from "../TableComponents/TablePrimaryItem";
import TableItem from "../TableComponents/TableItem";
import Task from "@/shared/interfaces/Tasks";
import SearchLeadsSelectAction from "../SearchLeadsComponents/SearchLeadsSelectAction";
import TasksTableSecondaryItem from "./TasksTableSecondaryItem";
import TasksTablePrimaryItem from "./TasksTablePrimaryItem";
import TaskTableFilter from "./TaskTableFilter";
export default function TasksTable({ tasks }: { tasks: Array<Task> }) {
  const [loading, setLoading] = useState<boolean>(true);
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
    <TableMain
      tableTitle="All Tasks"
      data={tasks}
      primaryKey="Task"
      primaryItems={tablePrimaryItems}
      secondaryItems={tableSecondaryItems}
      secondaryKeys={["Status", "Start time", "End time", "TTC", "Query count"]}
      filterComponent={<TaskTableFilter />}
      selectActionsComponent={<SearchLeadsSelectAction />}
    />
  );
}
