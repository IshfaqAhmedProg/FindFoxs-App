import React, { useState } from "react";
import Stats from "@/shared/interfaces/Stats";
import SingleResultCard from "../UtilityComponents/SingleResultCard";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import ValidatorsInput from "../UtilityComponents/ValidatorsInput";
import { IToolFormData } from "@/shared/interfaces/ToolForm";
import checkIfPNumber from "@/shared/functions/checkIfPNumber";
import convertToReadableString from "@/shared/functions/convertToReadableString";
import useSingleDataResult from "@/shared/hooks/useSingleDataResult";
import useCreateTask from "@/shared/hooks/useCreateTasks";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
const publicStats = [
  "phone",
  "phone_type",
  "phone_region",
  "country",
  "country_code",
  "country_prefix",
  "carrier",
];
const initialResultStat: Array<Stats> = publicStats.map((stat) => {
  return {
    statTitle: convertToReadableString(stat),
    stats: [
      {
        title: "Unknown",
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
export default function PhoneNumberValidator() {
  const router = useRouter();
  const { user } = useAuth();
  const [setUserTasks, loadingCreateTask] = useCreateTask({ user }); //handle creating new tasks when uploading file
  const [singleResult, fetchSingleDataResults, loadingSingleResult] =
    useSingleDataResult({
      initialResult: {
        resultScore: 0,
        resultReport: "No number validated yet!",
        resultStat: initialResultStat,
      },
      publicStats,
    }); //handles single input results
  async function submitSingleNumber(formData: IToolFormData) {
    await fetchSingleDataResults(
      "/api/validators/validatePhoneNumber",
      JSON.stringify({
        number: formData.formattedData[0],
      }),
      formData
    );
  }
  async function submitTask(formData: IToolFormData) {
    await setUserTasks(
      formData.formattedData,
      "Phone Number Validator",
      formData.formattedData.length,
      "number"
    )
      .then(() => router.push("/tasks"))
      .catch((err: any) => console.log(err));
  }

  return (
    <ValidatorWrapper title="Phone Number Validator">
      <ToolFormContextProvider
        checkFunction={checkIfPNumber}
        singleInputSubmitFunction={submitSingleNumber}
        taskSubmitFunction={submitTask}
        initialFormData={initialFormData}
        taskSubmitLoading={loadingCreateTask}
        singleDataLoading={loadingSingleResult}
      >
        <ValidatorsInput
          description="You can enter a single number or upload a file containing a list of numbers, make sure the file you upload is of .xlsx or .csv format. Also make sure the files have headers on the first row."
          unit="number"
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
