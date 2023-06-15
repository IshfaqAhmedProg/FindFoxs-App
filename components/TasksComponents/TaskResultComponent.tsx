import React from "react";
import EmailValidatorResult from "../ToolsComponents/EmailValidator/EmailValidatorResult";
import tasks from "@data/MockTasks.json";
import Loading from "../Loading/Loading";
export default function TaskResultComponent({
  taskId,
}: {
  taskId: string | string[] | undefined;
}) {
  const task = tasks.find((task) => task._id == taskId);
  if (task) {
    return <EmailValidatorResult task={task} />;
  } else {
    return <Loading />;
  }
}
