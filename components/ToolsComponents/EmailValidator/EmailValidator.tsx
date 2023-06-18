import React from "react";
import Stats from "@/shared/interfaces/Stats";
import SingleResultCard from "../UtilityComponents/SingleResultCard";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import ValidatorsInput from "../UtilityComponents/ValidatorsInput";
import { IToolFormData } from "@/shared/interfaces/ToolForm";
import convertToReadableString from "@/shared/functions/convertToReadableString";
import { useRouter } from "next/navigation";
import useCreateTask from "@/shared/hooks/useCreateTasks";
import { useAuth } from "@/contexts/AuthContext";
import useSingleDataResult from "@/shared/hooks/useSingleDataResult";
import checkIfEmail from "@/shared/functions/checkIfEmail";
const publicStats = [
  "reason",
  "disposable",
  "possible_typo",
  "mx_info",
  "risk",
];
const initialResultStat: Array<Stats> = publicStats.map((stat) => {
  return {
    statTitle: convertToReadableString(stat),
    stats: [
      {
        title: stat == "risk" ? 0 : "Unknown",
      },
    ],
  };
});
const initialFormData = {
  singleData: "",
  validationResult: "",
  fileName: "",
  unformattedData: [],
  extractLength: 0,
  formattedData: [],
  allColumnHeaders: [],
  columnHeader: "",
};
export default function EmailValidator() {
  const router = useRouter();
  const { user } = useAuth();
  const [setUserTasks, loadingCreateTask] = useCreateTask({ user }); //handle creating new tasks when uploading file
  const [singleResult, fetchSingleDataResults, loadingSingleResult] =
    useSingleDataResult({
      initialResultStat,
      publicStats,
    }); //handles single input results
  async function submitSingleEmail(formData: IToolFormData) {
    await fetchSingleDataResults(
      "/api/validators/validateEmail",
      JSON.stringify({
        domain: formData.formattedData[0],
      }),
      formData
    );
  }
  async function submitFile(formData: IToolFormData) {
    await setUserTasks(
      formData.formattedData,
      "Email Validator",
      formData.formattedData.length,
      "email"
    )
      .then(() => router.push("/tasks"))
      .catch((err: any) => console.log(err));
  }
  return (
    <ValidatorWrapper title="Email Validator">
      <ToolFormContextProvider
        checkFunction={checkIfEmail}
        singleInputSubmitFunction={submitSingleEmail}
        fileInputSubmitFunction={submitFile}
        initialFormData={initialFormData}
        fileDataLoading={loadingCreateTask}
        singleDataLoading={loadingSingleResult}
      >
        <ValidatorsInput
          description="You can enter a single email or upload a file containing a list of emails, make sure the file you upload is of .xlsx or .csv format. Also make sure the files have headers on the first row."
          unit="email"
        />
      </ToolFormContextProvider>
      <SingleResultCard
        loading={loadingSingleResult}
        confidence={singleResult.resultScore}
        result={singleResult.resultReport}
        resultStat={singleResult.resultStat}
      />
      <ToolVideo videoId="TF67a-48jlY" />
    </ValidatorWrapper>
  );
}
