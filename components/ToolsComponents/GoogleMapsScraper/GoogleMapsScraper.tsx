import React, { useState, useEffect } from "react";
import ValidatorWrapper from "../UtilityComponents/ValidatorWrapper";
import ToolVideo from "../UtilityComponents/ToolVideoCard";
import { ToolFormContextProvider } from "@/contexts/ToolFormContext";
import GoogleMapsScraperInput from "./GoogleMapsScraperInput";
import { IToolFormData } from "@/shared/interfaces/ToolForm";
import useCreateTask from "@/shared/hooks/useCreateTasks";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export default function GoogleMapsScraper() {
  const router = useRouter();
  const { user } = useAuth();
  const [setUserTasks, loadingCreateTask] = useCreateTask({ user }); //handle creating new tasks when uploading file
  const googleMapsScraper = {
    keywords: [],
    country: "",
    state: "",
    city: "",
    language: "en",
    countryCode: "",
    stateCode: "",
    addons: "",
    coords: "",
  };
  const [loading, setLoading] = useState<boolean>(false);
  async function submitTask(formData: IToolFormData) {
    setLoading(true);
    await fetch("/api/geoData/getGeoCoordinates", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: formData.city ?? null,
        state: formData.state ?? null,
        country: formData.country,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        await setUserTasks(
          { ...formData, coords: `@${res[0].lat},${res[0].lon},12z` },
          "Google Maps Scraper",
          formData.keywords.length,
          "keyword"
        )
          .then(() => {
            router.push("/tasks");
            setLoading(false);
          })
          .catch((err: any) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log("getGeoCoordinate error", err);
      });
  }
  useEffect(() => {
    setLoading(loadingCreateTask);
  }, [loadingCreateTask]);
  return (
    <ValidatorWrapper title="Google Maps Scraper">
      <ToolFormContextProvider
        taskSubmitFunction={submitTask}
        taskSubmitLoading={loading}
        initialFormData={googleMapsScraper}
      >
        <GoogleMapsScraperInput />
      </ToolFormContextProvider>
      {/* <ToolVideo videoId="TF67a-48jlY" /> */}
    </ValidatorWrapper>
  );
}
