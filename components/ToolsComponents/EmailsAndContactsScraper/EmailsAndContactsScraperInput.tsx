import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Box, Divider, Stack, Typography, Autocomplete } from "@mui/material";
import React from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useToolForm } from "@/contexts/ToolFormContext";
import CustomButton from "@/components/CustomComponents/CustomButton";
import DragNDrop from "../UtilityComponents/DragNDrop";

export default function EmailsAndContactsScraperInput() {
  const {
    formData,
    handleTextInputChange,
    handleTextInputSubmit,
    singleDataLoading,
  } = useToolForm();
  // {
  //   console.log("formData", formData);
  // }
  const options: Array<string> = [];
  return (
    <Stack pt={4} alignItems={"center"} gap={6} maxWidth={"500px"}>
      <Typography textAlign={"center"}>
        Enter the urls of the websites you want to scrape. You can also upload a
        .xlsx or .csv file containing the urls. Make sure to check your urls if
        they are valid urls
      </Typography>
      <Stack direction={"row"} gap={2}>
        <Autocomplete
          freeSolo
          multiple
          size="small"
          options={options}
          onChange={(e, val) => val && handleTextInputChange(val)}
          renderInput={(params) => (
            <CustomTextInput
              placeholder="Enter url(s) here"
              sx={{ minWidth: "250px" }}
              {...params}
            />
          )}
        />
      </Stack>
      {formData?.textData.length > 0 && (
        <CustomButton
          kind="secondary"
          loading={singleDataLoading}
          buttonProps={{
            onClick: handleTextInputSubmit,
            disabled: formData.formattedData.length == 0,
            type: "submit",
          }}
        >
          {formData.formattedData.length == 0
            ? "Invalid url(s)"
            : "Scrape Url(s)"}
        </CustomButton>
      )}
      {!(formData?.textData.length > 0) && (
        <>
          <Box minWidth={"250px"}>
            <Divider>or</Divider>
          </Box>
          <DragNDrop />
        </>
      )}
    </Stack>
  );
}
