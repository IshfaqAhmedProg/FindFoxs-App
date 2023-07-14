import React from "react";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import EmailAndContactsInput from "./EmailAndContactsInput";

export default function EmailAndContactsScraper() {
  const emailAndContacts = {
    url: "",
    page: "",
    fileName: "",
    unformattedData: [],
    formattedData: [],
    allColumnHeaders: [],
    columnHeader: "",
  };
  return (
    <ValidatorWrapper title="Email And Contacts Scraper">
      <ToolFormContextProvider
        taskSubmitFunction={() => {
          console.log("file requested");
        }}
        initialFormData={emailAndContacts}
      >
        <EmailAndContactsInput />
      </ToolFormContextProvider>
      <ToolVideo videoId="TF67a-48jlY" />
    </ValidatorWrapper>
  );
}
