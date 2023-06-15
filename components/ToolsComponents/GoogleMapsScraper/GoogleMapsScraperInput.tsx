import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Box, Divider, Stack, Typography, Autocomplete } from "@mui/material";
import useSWR, { Fetcher } from "swr";

import React, { useEffect, useState } from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useToolForm } from "@/contexts/ToolFormContext";
import { CountryStateCity } from "@/shared/interfaces/ToolForm";
const topFilms = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men",
  "Schindler's List",
  "Pulp Fiction",
  "The Lord of the Rings: The Return of the King",
  "The Good, the Bad and the Ugly",
  "Fight Club",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Star Wars: Episode V - The Empire Strikes Back",
  "Forrest Gump",
  "Inception",
  "The Lord of the Rings: The Two Towers",
  "One Flew Over the Cuckoo's Nest",
  "Goodfellas",
  "The Matrix",
  "Seven Samurai",
  "Star Wars: Episode IV - A New Hope",
];

const fetcher: Fetcher<Array<CountryStateCity>, string> = (...args) =>
  fetch(...args).then((res) => res.json());
const options = {
  dedupingInterval: 10000,
};
export default function GoogleMapsScraperInput() {
  const {
    formData,
    handleKeywordChange,
    handleFileDataChange,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
  } = useToolForm();
  {
    console.log("formData", formData);
  }
  const [countryStates, setCountryStates] = useState([]);
  const [statesCity, setStateCity] = useState([]);
  const { data: allCountries, error } = useSWR(
    "/api/getCountry",
    fetcher,
    options
  );
  {
    console.log("countryStates", countryStates);
  }
  {
    console.log("statesCity", statesCity);
  }
  useEffect(() => {
    if (formData.countryCode != "") {
      fetch("/api/getStateFromCountry", {
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
      fetch("/api/getCityFromState", {
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
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Typography>Keywords:</Typography>
          <Autocomplete
            freeSolo
            multiple
            size="small"
            options={topFilms}
            limitTags={5}
            value={formData.keywords}
            onChange={(e, val) => {
              handleKeywordChange(val);
            }}
            renderInput={(params) => (
              <CustomTextInput
                placeholder="Enter keywords"
                sx={{ minWidth: "250px" }}
                {...params}
              />
            )}
          />
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
              renderInput={(params) => (
                <CustomTextInput
                  placeholder="Select Country"
                  sx={{ minWidth: "250px" }}
                  {...params}
                />
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
                disabled={countryStates.length == 0}
                renderInput={(params) => (
                  <CustomTextInput
                    placeholder="Select State"
                    sx={{ minWidth: "160px" }}
                    {...params}
                  />
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
                renderInput={(params) => (
                  <CustomTextInput
                    placeholder="Select City"
                    sx={{ minWidth: "160px" }}
                    {...params}
                  />
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
