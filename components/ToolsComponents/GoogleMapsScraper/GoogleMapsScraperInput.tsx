import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Box, Divider, Stack, Typography, Autocomplete } from "@mui/material";
import useSWR, { Fetcher } from "swr";

import React, { useEffect, useState } from "react";
import { useToolForm } from "@/contexts/ToolFormContext";
import { CountryStateCity } from "@/shared/interfaces/ToolForm";
import Image from "next/image";

import keywordOptions from "@/shared/data/KeywordSuggestions.json";
const fetcher: Fetcher<Array<CountryStateCity>, string> = (...args) =>
  fetch(...args).then((res) => res.json());
const options = {
  dedupingInterval: 10000,
};
export default function GoogleMapsScraperInput() {
  const {
    formData,
    handleKeywordChange,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
  } = useToolForm();
  // {
  //   console.log("formData", formData);
  // }
  const [countryStates, setCountryStates] = useState([]);
  const [statesCity, setStateCity] = useState([]);
  const { data: allCountries, error } = useSWR(
    "/api/geoData/getCountry",
    fetcher,
    options
  );
  // {
  //   console.log("countryStates", countryStates);
  // }
  // {
  //   console.log("statesCity", statesCity);
  // }
  useEffect(() => {
    if (formData.countryCode != "") {
      fetch("/api/geoData/getStateFromCountry", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          iso2: formData.countryCode,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setCountryStates(res);
        });
    }
  }, [formData.countryCode]);
  //fetch city from states and country
  useEffect(() => {
    if (formData.stateCode != "") {
      fetch("/api/geoData/getCityFromState", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isoC: formData.countryCode,
          isoS: formData.stateCode,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setStateCity(res);
        });
    }
  }, [formData.stateCode, formData.countryCode]);

  return (
    <Stack pt={4} alignItems={"center"} gap={6} maxWidth={"500px"}>
      <Typography textAlign={"center"}>
        Enter keywords as you would type in the google maps search box or upload
        a file containing the keywords, make sure the file you upload is of
        .xlsx or .csv format. Also make sure the files have headers on the first
        row.
      </Typography>
      <Stack gap={2}>
        <Stack gap={2} alignItems={"center"}>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Typography>Keywords:</Typography>
            <Autocomplete
              freeSolo
              multiple
              size="small"
              options={keywordOptions}
              limitTags={5}
              value={formData.keywords}
              onChange={(e, val) => {
                handleKeywordChange(val);
              }}
              renderInput={(params) => (
                <CustomTextInput
                  placeholder="Enter keywords"
                  sx={{ minWidth: "300px", maxWidth: "300px" }}
                  {...params}
                  disabled={formData.keywords.length == 5}
                />
              )}
            />
          </Stack>
          {formData.keywords.length == 5 && (
            <Typography color="error">
              Max no. of keywords allowed is 5.
            </Typography>
          )}
        </Stack>
        <Typography>Location:</Typography>
        {allCountries != undefined && (
          <>
            <Autocomplete
              size="small"
              options={allCountries}
              getOptionLabel={(option: CountryStateCity) => option.name}
              limitTags={5}
              onChange={(e, val) => {
                if (val) {
                  handleCountryChange(val);
                  setCountryStates([]);
                  setStateCity([]);
                }
              }}
              sx={{ flex: "1 0 auto" }}
              renderOption={(props, option) => (
                <Stack direction={"row"} component="li" {...props} gap={1}>
                  {option.iso2 && (
                    <Image
                      loading="lazy"
                      height={"12"}
                      width={"20"}
                      src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
                      alt={`flag of ${option.name}`}
                    />
                  )}
                  {option.name}
                </Stack>
              )}
              renderInput={(props) => (
                <CustomTextInput placeholder="Select Country" {...props} />
              )}
            />
            <Stack direction={"row"} gap={2}>
              <Autocomplete
                size="small"
                options={countryStates}
                getOptionLabel={(option: CountryStateCity) => option.name}
                limitTags={5}
                onChange={(e, val) => {
                  if (val) {
                    handleStateChange(val);
                    setStateCity([]);
                  }
                }}
                sx={{ flex: "1 0 auto" }}
                disabled={countryStates.length == 0}
                renderInput={(params) => (
                  <CustomTextInput placeholder="Select State" {...params} />
                )}
              />
              <Autocomplete
                size="small"
                options={statesCity}
                getOptionLabel={(option: CountryStateCity) => option.name}
                limitTags={5}
                onChange={(e, val) => {
                  if (val) handleCityChange(val);
                }}
                disabled={statesCity.length == 0}
                sx={{ flex: "1 0 auto" }}
                renderInput={(params) => (
                  <CustomTextInput placeholder="Select City" {...params} />
                )}
              />
            </Stack>
          </>
        )}
      </Stack>
      <Box minWidth={"250px"}>
        <Divider>Additional Options</Divider>
      </Box>
    </Stack>
  );
}
