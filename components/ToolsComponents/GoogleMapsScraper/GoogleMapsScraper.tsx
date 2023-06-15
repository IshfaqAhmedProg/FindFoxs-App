import CustomButton from "@/components/CustomComponents/CustomButton";
import { Stack } from "@mui/material";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Stats from "@/shared/interfaces/Stats";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import isEmail from "validator/lib/isEmail";
import GoogleMapsScraperInput from "./GoogleMapsScraperInput";

export default function GoogleMapsScraper() {
  const pathName = usePathname();
  const router = useRouter();

  const resultStat: Array<Stats> = [
    {
      statTitle: "Reason",
      stats: [
        {
          title: "Unable to get domain or MX pointer.",
          stat: "",
          statUnit: "",
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
  function checkIfEmail(emailArray: Array<string>) {
    const finalArray = [];
    for (const email of emailArray) {
      if (email && isEmail(email.toString())) {
        //format the item for task
        console.log(email);
        finalArray.push(email);
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
            pathName == "/tools/emailValidator"
              ? { color: "var(--primary)" }
              : { color: "var(--graylight)" },
        }}
      >
        Validate
      </CustomButton>
      <CustomButton
        kind="plain"
        buttonProps={{
          sx:
            pathName == "/tools/emailValidator/results"
              ? { color: "var(--primary)" }
              : { color: "var(--graylight)" },
          onClick: () => router.push("/tasks"),
        }}
      >
        History
      </CustomButton>
    </Stack>
  );
  const googleMapsScraper = {
    keywords: [],
    country: "",
    state: "",
    city: "",
    language: "en",
    countryCode: "",
    stateCode: "",
    addons: "",
  };
  return (
    <ValidatorWrapper title="Google Maps Scraper" action={actionButtons}>
      <ToolFormContextProvider
        checkFunction={checkIfEmail}
        singleRequest="abc"
        fileRequest={() => {
          console.log("file requested");
        }}
        initialFormData={googleMapsScraper}
      >
        <GoogleMapsScraperInput />
      </ToolFormContextProvider>
      <ToolVideo videoId="TF67a-48jlY" />
    </ValidatorWrapper>
  );
}
