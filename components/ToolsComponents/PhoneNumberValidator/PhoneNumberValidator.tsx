import React, { useState } from "react";
import Stats from "@/shared/interfaces/Stats";
import SingleResultCard from "../UtilityComponents/SingleResultCard";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import ValidatorsInput from "../UtilityComponents/ValidatorsInput";
import { IToolFormData } from "@/shared/interfaces/ToolForm";
import checkIfPNumber from "@/shared/functions/checkIfPNumber";
import fetchSingleDataResults from "@/shared/functions/fetchSingleDataResults";
import convertToReadableString from "@/shared/functions/convertToReadableString";
import { SingleResult } from "@/shared/interfaces/ValidatorResponses";
import analyseSingleDataResult from "@/shared/functions/analyseSingleDataResult";

export default function PhoneNumberValidator() {
  const [loading, setLoading] = useState<boolean>(false);

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
  const [singleResult, setSingleResult] = useState<SingleResult>({
    resultScore: 0,
    resultReport: "No Number validated yet!",
    resultStat: initialResultStat,
  });
  async function submitSingleNumber(formData: IToolFormData) {
    setLoading(true);
    await fetchSingleDataResults(
      "/api/validators/validatePhoneNumber",
      publicStats,
      JSON.stringify({
        number: formData.formattedData[0],
      })
    ).then((data) => {
      const statAnal = analyseSingleDataResult(
        data,
        publicStats,
        formData.formattedData[0]
      );
      setSingleResult({
        ...singleResult,
        resultStat: statAnal.stat,
        resultScore: statAnal.score,
        resultReport: statAnal.report,
      });
      setLoading(false);
    });
  }
  const validatorType = {
    singleData: "",
    validationResult: "",
    fileName: "",
    unformattedData: [],
    extractLength: 0,
    formattedData: [],
    allColumnHeaders: [],
    columnHeader: "",
  };
  return (
    <ValidatorWrapper title="Phone Number Validator">
      <ToolFormContextProvider
        checkFunction={checkIfPNumber}
        singleInputSubmitFunction={submitSingleNumber}
        fileInputSubmitFunction={() => {
          console.log("file requested");
        }}
        initialFormData={validatorType}
      >
        <ValidatorsInput
          description="You can enter a single number or upload a file containing a list of numbers, make sure the file you upload is of .xlsx or .csv format. Also make sure the files have headers on the first row."
          unit="number"
        />
      </ToolFormContextProvider>
      <SingleResultCard
        loading={loading}
        confidence={singleResult.resultScore}
        result={singleResult.resultReport}
        resultStat={singleResult.resultStat}
      />
      <ToolVideo videoId="TF67a-48jlY" />
    </ValidatorWrapper>
  );
}
