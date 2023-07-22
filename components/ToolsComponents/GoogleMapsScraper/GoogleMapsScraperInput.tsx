import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Autocomplete,
  Collapse,
} from "@mui/material";
import useSWR, { Fetcher } from "swr";

import React, { useEffect, useState } from "react";
import { useToolForm } from "@/contexts/ToolFormContext";
import { CountryStateCity, Language } from "@/shared/interfaces/ToolForm";
import Image from "next/image";

import keywordOptions from "@/shared/data/KeywordSuggestions.json";
import languageOptions from "@/shared/data/SearchLanguages.json";
import AddonInterface from "../UtilityComponents/AddonInterface";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import CustomButton from "@/components/CustomComponents/CustomButton";
const fetcher: Fetcher<Array<CountryStateCity>, string> = (...args) =>
  fetch(...args).then((res) => res.json());
const options = {
  dedupingInterval: 10000,
};
export default function GoogleMapsScraperInput() {
  const {
    formData,
    taskSubmitLoading,
    handleKeywordChange,
    handleCountryChange,
    handleStateChange,
    handleLanguageChange,
    handleCityChange,
    handleAddonChange,
    handleTaskSubmit,
  } = useToolForm();
  // {
  //   console.log("formData", formData);
  // }
  const [addOptsTrigger, setAddOptsTrigger] = useState<boolean>(false);
  const [countryStates, setCountryStates] = useState([]);
  const [statesCity, setStateCity] = useState([]);
  const { data: allCountries, error: allCountryError } = useSWR(
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
  function handleAddOptsTrigger() {
    setAddOptsTrigger((prev) => !prev);
  }

  useEffect(() => {
    if (formData.country) {
      fetch("/api/geoData/getStateFromCountry", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          iso2: formData.country.iso2,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setCountryStates(res);
        });
    }
  }, [formData.country]);
  //fetch city from states and country
  useEffect(() => {
    if (formData.state && formData.country) {
      fetch("/api/geoData/getCityFromState", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isoC: formData.country.iso2,
          isoS: formData.state.iso2,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setStateCity(res);
        });
    }
  }, [formData.state, formData.country]);
  return (
    <Stack
      p={1}
      pt={4}
      alignItems={"center"}
      gap={3}
      maxWidth={"500px"}
      maxHeight={"80vh"}
      sx={{ overflowY: "auto" }}
    >
      <Typography textAlign={"center"} fontSize={"14px"}>
        Enter keywords as you would type in the google maps search box. Maximum
        of 5 keywords are allowed on one task. Make sure to select keywords
        relevant to the business category you are targetting. If you dont find
        your keywords in the list below you can add your own.
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
                value={formData.state}
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
                value={formData.city}
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
      <Box minWidth={"300px"}>
        <Divider>
          <CustomButton
            kind="plain"
            buttonProps={{
              endIcon: addOptsTrigger ? (
                <ArrowDropUpRoundedIcon />
              ) : (
                <ArrowDropDownRoundedIcon />
              ),
              onClick: handleAddOptsTrigger,
            }}
          >
            Additional Options
          </CustomButton>
        </Divider>
      </Box>
      <Box>
        <Collapse in={addOptsTrigger}>
          <Stack gap={2} width={"100%"} alignItems={"center"}>
            <Stack direction="row" gap={2} alignItems={"center"}>
              <Typography>Select Language of search results:</Typography>
              <Autocomplete
                size="small"
                options={languageOptions}
                getOptionLabel={(option: Language) => option.label}
                limitTags={5}
                onChange={(e, val) => {
                  if (val) handleLanguageChange(val);
                }}
                renderInput={(params) => (
                  <CustomTextInput
                    placeholder="Language"
                    sx={{ minWidth: "150px", maxWidth: "150px" }}
                    {...params}
                    disabled={formData.keywords.length == 5}
                  />
                )}
              />
            </Stack>
            <AddonInterface onAddonSelect={handleAddonChange} />
          </Stack>
        </Collapse>
      </Box>
      <CustomButton
        kind="secondary"
        loading={taskSubmitLoading}
        buttonProps={{
          disabled: formData.keywords.length == 0 || !formData.country,
          onClick: handleTaskSubmit,
        }}
      >
        Submit
      </CustomButton>
    </Stack>
  );
}
