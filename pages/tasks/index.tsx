import TasksTable from "@/components/TasksComponents/TasksTable";
import Head from "next/head";

export default function Tasks() {
  return (
    <>
      <Head>
        <title>FindFoxs-Tasks</title>
      </Head>
      <TasksTable />
    </>
  );
}
