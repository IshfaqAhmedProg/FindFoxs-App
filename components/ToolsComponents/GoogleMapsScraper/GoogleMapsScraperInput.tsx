import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import keywordOptions from "@/shared/data/KeywordSuggestions.json";
import languageOptions from "@/shared/data/SearchLanguages.json";
import useLocationForm from "@/shared/hooks/useLocationForm";
import useToolForm, {
  ToolFormProps,
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
import { useEffect, useState } from "react";
import AddonInterface from "../UtilityComponents/AddonInterface";

export interface Language {
  label: string;
  subtag: string;
}
export default function GoogleMapsScraperInput({ submitTask }: ToolFormProps) {
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
  const { LocationForm, location, fetchCoords } = useLocationForm();
  {
    console.log("formData", formData);
  }
  useEffect(() => {
    if (location.city) {
      handleUpdateFormData({ coords: fetchCoords() });
    }
  }, [location.city]);
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
        {LocationForm}
      </Stack>
      <Box minWidth={"300px"}>
        <Divider>
          <CustomButton
            kind="plain"
            endIcon={
              addOptsTrigger ? (
                <ArrowDropUpRoundedIcon />
              ) : (
                <ArrowDropDownRoundedIcon />
              )
            }
            onClick={handleAddOptsTrigger}
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
        disabled={formData.textData.length == 0 || location.coords == ""}
        onClick={handleTaskSubmit}
      >
        Submit
      </CustomButton>
    </>
  );
}
