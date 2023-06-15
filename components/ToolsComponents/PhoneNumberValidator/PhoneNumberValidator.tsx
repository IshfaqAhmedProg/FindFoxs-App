import CustomButton from "@/components/CustomComponents/CustomButton";
import { Stack } from "@mui/material";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Stats from "@/shared/interfaces/Stats";
import SingleResultCard from "../UtilityComponents/SingleResultCard";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import isMobilePhone from "validator/lib/isMobilePhone";
import ValidatorsInput from "../UtilityComponents/ValidatorsInput";

export default function PhoneNumberValidator() {
  const pathName = usePathname();
  const router = useRouter();

  const resultStat: Array<Stats> = [
    {
      statTitle: "Reason",
      stats: [
        {
          title: "Unable to get domain or MX pointer.",
        },
      ],
    },
    {
      statTitle: "Disposable",
      stats: [
        {
          title: "False",
        },
      ],
    },
    {
      statTitle: "Possible Typo:",
      stats: [
        {
          title: "None",
        },
      ],
    },
    {
      statTitle: "MX Info:",
      stats: [
        {
          title: "No MX-pointer in DNS record. Using domain: dsa.dsad",
        },
      ],
    },
  ];
  function checkIfPNumber(pNumberArray: Array<string>) {
    const finalArray = [];
    for (const pNumber of pNumberArray) {
      if (pNumber && isMobilePhone(pNumber.toString())) {
        //format the item for task
        const formattedNumber =
          "+" +
          pNumber
            .toString()
            .replace(/[-+()]/g, "")
            .replace(/\s/g, "");
        console.log(formattedNumber);
        finalArray.push(formattedNumber);
      }
    }
    return finalArray;
  }
  const actionButtons = (
    <Stack direction="row" gap={2} ml={2} pt={0.15}>
      <CustomButton
        kind="plain"
        buttonProps={{
          sx:
            pathName == "/tools/phoneNumberValidator"
              ? { color: "var(--primary)" }
              : { color: "var(--graylight)" },
        }}
      >
        Validate
      </CustomButton>
      <CustomButton
        kind="plain"
        buttonProps={{
          sx: { color: "var(--graylight)" },
          onClick: () => router.push("/tasks"),
        }}
      >
        History
      </CustomButton>
    </Stack>
  );
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
    <ValidatorWrapper title="Phone Number Validator" action={actionButtons}>
      <ToolFormContextProvider
        checkFunction={checkIfPNumber}
        singleRequest="abc"
        fileRequest={() => {
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
        confidence={75}
        result="Phone Number Valid"
        resultStat={resultStat}
      />
      <ToolVideo videoId="TF67a-48jlY" />
    </ValidatorWrapper>
  );
}
