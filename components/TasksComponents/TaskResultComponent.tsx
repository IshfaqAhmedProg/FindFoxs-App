import React, { useEffect, useState } from "react";
import EmailValidatorResult from "../ToolsComponents/EmailValidator/EmailValidatorResult";
import Loading from "../Loading/Loading";
import useGetDocument from "@/shared/hooks/useGetDocument";
import Task, { isTask } from "@/shared/interfaces/Tasks";
import PhoneNumberValidatorResult from "../ToolsComponents/PhoneNumberValidator/PhoneNumberValidatorResult";
import GoogleMapsScraperResult from "../ToolsComponents/GoogleMapsScraper/GoogleMapsScraperResult";
import { useAuth } from "@/contexts/AuthContext";
export default function TaskResultComponent({ taskId }: { taskId: string }) {
  const [task, setTask] = useState<Array<Task | undefined>>([]);
  const { user } = useAuth();
  const [value, loading, error] = useGetDocument({
    document: taskId,
    collection: `users/${user?.uid}/tasks`,
  });
  useEffect(() => {
    if (value) {
      setTask(value as Array<Task>);
    }
  }, [value]);
  // console.log("task:", value);
  // const task = tasks.find((task) => task._id == taskId);
  if (isTask<Task>(task)) {
    switch (task.tool) {
      case "Email Validator":
        return <EmailValidatorResult task={task} />;
        break;
      case "Phone Number Validator":
        return <PhoneNumberValidatorResult task={task} />;
        break;
      case "Google Maps Scraper":
        return <GoogleMapsScraperResult task={task} />;
        break;
      case "Emails And Contacts Scraper":
        return <GoogleMapsScraperResult task={task} />;
        break;
      case "Facebook Scraper":
        return <GoogleMapsScraperResult task={task} />;
        break;
      default:
        return <Loading />;
        break;
    }
  } else {
    return <Loading />; //should be task failed
  }
}
