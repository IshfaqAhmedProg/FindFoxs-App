import React from "react";
import ToolsLayout from "../UtilityComponents/ToolsLayout";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import useCreateTask from "@/shared/hooks/useCreateTasks";
import { useAuth } from "@/contexts/AuthContext";
import { IToolFormData } from "@/shared/interfaces/ToolForm";
import { useRouter } from "next/router";
import checkIfFacebookPage from "@/shared/functions/checkIfFunctions/checkIfFacebookPage";
import FacebookScraperInput from "./FacebookScraperInput";

export default function FacebookScraper() {
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
      "Facebook Scraper",
      formData.formattedData.length,
      "page"
    )
      .then(() => router.push("/tasks"))
      .catch((err: any) => console.log(err));
  }
  return (
    <ToolsLayout title="Facebook Scraper">
      <ToolFormContextProvider
        initialFormData={emailAndContacts}
        checkFunction={checkIfFacebookPage}
        textInputSubmitFunction={submitTask}
        taskSubmitFunction={submitTask}
        taskSubmitLoading={loadingCreateTask}
        singleDataLoading={loadingCreateTask}
      >
        <FacebookScraperInput />
      </ToolFormContextProvider>
      <ToolVideo videoId="TF67a-48jlY" />
    </ToolsLayout>
  );
}
