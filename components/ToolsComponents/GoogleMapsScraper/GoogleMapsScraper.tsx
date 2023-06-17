import React from "react";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import GoogleMapsScraperInput from "./GoogleMapsScraperInput";

export default function GoogleMapsScraper() {
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
    <ValidatorWrapper title="Google Maps Scraper">
      <ToolFormContextProvider
        fileInputSubmitFunction={() => {
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
