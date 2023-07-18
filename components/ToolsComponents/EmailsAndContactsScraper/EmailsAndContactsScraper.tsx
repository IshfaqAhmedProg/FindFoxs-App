import React from "react";
import ToolsLayout from "../UtilityComponents/ToolsLayout";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import EmailsAndContactsScraperInput from "./EmailsAndContactsScraperInput";
import checkIfUrl from "@/shared/functions/checkIfFunctions/checkIfUrl";
import useCreateTask from "@/shared/hooks/useCreateTasks";
import { useAuth } from "@/contexts/AuthContext";
import { IToolFormData } from "@/shared/interfaces/ToolForm";
import { useRouter } from "next/router";

export default function EmailsAndContactsScraper() {
  const emailAndContacts = {
    textData: [],
    pages: "",
    fileName: "",
    unformattedData: [],
    formattedData: [],
    allColumnHeaders: [],
    columnHeader: "",
  };
  const { user } = useAuth();
  const [setUserTasks, loadingCreateTask] = useCreateTask({ user }); //handle creating new tasks when uploading file
  const router = useRouter();
  async function submitTask(formData: IToolFormData) {
    await setUserTasks(
      formData.formattedData,
      "Emails And Contacts Scraper",
      formData.formattedData.length,
      "url"
    )
      .then(() => router.push("/tasks"))
      .catch((err: any) => console.log(err));
  }
  return (
    <ToolsLayout title="Email And Contacts Scraper">
      <ToolFormContextProvider
        initialFormData={emailAndContacts}
        checkFunction={checkIfUrl}
        textInputSubmitFunction={submitTask}
        taskSubmitFunction={submitTask}
        taskSubmitLoading={loadingCreateTask}
        singleDataLoading={loadingCreateTask}
      >
        <EmailsAndContactsScraperInput />
      </ToolFormContextProvider>
      <ToolVideo videoId="TF67a-48jlY" />
    </ToolsLayout>
  );
}
