import React from "react";
import Stats from "@/shared/interfaces/Stats";
import SingleResultCard from "../UtilityComponents/SingleResultCard";
import ToolsLayout from "../UtilityComponents/ToolsLayout";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import ValidatorsInput from "../UtilityComponents/ValidatorsInput";
import { IToolFormData } from "@/shared/interfaces/ToolForm";
import convertToReadableString from "@/shared/functions/stringTransformers/convertToReadableString";
import { useRouter } from "next/navigation";
import useCreateTask from "@/shared/hooks/useCreateTasks";
import { useAuth } from "@/contexts/AuthContext";
import useSingleDataResult from "@/shared/hooks/useSingleDataResult";
import checkIfEmail from "@/shared/functions/checkIfFunctions/checkIfEmail";
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
  textData: [],
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
      initialResult: {
        resultScore: 0,
        resultReport: "No email validated yet!",
        resultStat: initialResultStat,
      },
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
  async function submitTask(formData: IToolFormData) {
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
    <ToolsLayout title="Email Validator">
      <ToolFormContextProvider
        checkFunction={checkIfEmail}
        textInputSubmitFunction={submitSingleEmail}
        taskSubmitFunction={submitTask}
        initialFormData={initialFormData}
        taskSubmitLoading={loadingCreateTask}
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
    </ToolsLayout>
  );
}
