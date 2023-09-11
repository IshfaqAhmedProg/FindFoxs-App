import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import keywordOptions from "@/shared/data/KeywordSuggestions.json";
import languageOptions from "@/shared/data/SearchLanguages.json";
import useLocationForm, {
  CountryStateCity,
} from "@/shared/hooks/useLocationForm";
import useToolForm, {
  ToolFormInputProps,
  initialFormData,
} from "@/shared/hooks/useToolForm";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import {
  Autocomplete,
  Box,
  Collapse,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import AddonInterface from "../UtilityComponents/AddonInterface";

export interface Language {
  label: string;
  subtag: string;
}
export default function GoogleMapsScraperInput({
  submitTask,
}: ToolFormInputProps) {
  const {
    formData,
    loading,
    handleTextMultipleInputChange,
    handleTaskSubmit,
    handleUpdateFormData,
  } = useToolForm({
    initialState: initialFormData,
    submitTask,
  });
  const {
    location,
    allCountries,
    countryStates,
    statesCity,
    loading: locationLoading,
    resetCountryStateCity,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    fetchCoords,
  } = useLocationForm();
  // {
  //   console.log("formData", formData);
  // }
  const [addOptsTrigger, setAddOptsTrigger] = useState<boolean>(false);

  function handleAddOptsTrigger() {
    setAddOptsTrigger((prev) => !prev);
  }

  return (
    <>
      <Typography textAlign={"center"} fontSize={"14px"} maxWidth={"80%"}>
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
              value={formData.textData as Array<string>}
              onChange={(e, val) => {
                handleTextMultipleInputChange(val);
              }}
              renderInput={(params) => (
                <CustomTextInput
                  placeholder="Enter keywords"
                  sx={{ minWidth: "300px", maxWidth: "300px" }}
                  {...params}
                  disabled={formData.textData.length == 5}
                />
              )}
            />
          </Stack>
          {formData.textData.length == 5 && (
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
                  resetCountryStateCity("all");
                }
              }}
              loading={locationLoading}
              loadingText={"Please wait..."}
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
                    resetCountryStateCity("stateCity");
                  }
                }}
                loading={locationLoading}
                loadingText={"Please wait..."}
                value={location.state}
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
                onChange={async (e, val) => {
                  if (val) {
                    handleCityChange(val);
                    handleUpdateFormData({ coords: await fetchCoords() });
                  }
                }}
                loading={locationLoading}
                loadingText={"Please wait..."}
                value={location.city}
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
                  if (val) handleUpdateFormData({ language: val });
                }}
                renderInput={(params) => (
                  <CustomTextInput
                    placeholder="Language"
                    sx={{ minWidth: "150px", maxWidth: "150px" }}
                    {...params}
                    disabled={formData.textData.length == 5}
                  />
                )}
              />
            </Stack>
            <AddonInterface
              onAddonSelect={(addons) =>
                handleUpdateFormData({ addons: addons[0] })
              }
            />
          </Stack>
        </Collapse>
      </Box>
      <CustomButton
        kind="secondary"
        loading={loading}
        buttonProps={{
          disabled: formData.textData.length == 0 || location.coords == "",
          onClick: handleTaskSubmit,
        }}
      >
        Submit
      </CustomButton>
    </>
  );
}
