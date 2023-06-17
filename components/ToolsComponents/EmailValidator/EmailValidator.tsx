import React, { useState } from "react";
import Stats from "@/shared/interfaces/Stats";
import SingleResultCard from "../UtilityComponents/SingleResultCard";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import isEmail from "validator/lib/isEmail";
import ValidatorsInput from "../UtilityComponents/ValidatorsInput";
import { IToolFormData } from "@/shared/interfaces/ToolForm";
import convertToReadableString from "@/shared/functions/convertToReadableString";
import fetchSingleDataResults from "@/shared/functions/fetchSingleDataResults";
import analyseSingleDataResult from "@/shared/functions/analyseSingleDataResult";
import { SingleResult } from "@/shared/interfaces/ValidatorResponses";

export default function EmailValidator() {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [singleResult, setSingleResult] = useState<SingleResult>({
    resultScore: 0,
    resultReport: "No Email validated yet!",
    resultStat: initialResultStat,
  });
  function checkIfEmail(emailArray: Array<string>) {
    const finalArray = [];
    for (const email of emailArray) {
      if (email && isEmail(email.toString())) {
        finalArray.push(email);
      }
    }
    return finalArray;
  }
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
  async function submitSingleEmail(formData: IToolFormData) {
    setLoading(true);
    await fetchSingleDataResults(
      "/api/validators/validateEmail",
      publicStats,
      JSON.stringify({
        domain: formData.formattedData[0],
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
  return (
    <ValidatorWrapper title="Email Validator">
      <ToolFormContextProvider
        checkFunction={checkIfEmail}
        singleInputSubmitFunction={submitSingleEmail}
        fileInputSubmitFunction={(formData: IToolFormData) => {
          console.log("gugu", formData);
        }}
        initialFormData={initialFormData}
      >
        <ValidatorsInput
          description="You can enter a single email or upload a file containing a list of emails, make sure the file you upload is of .xlsx or .csv format. Also make sure the files have headers on the first row."
          unit="email"
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
