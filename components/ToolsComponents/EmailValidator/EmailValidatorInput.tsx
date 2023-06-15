import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useToolForm } from "@/contexts/ToolFormContext";
import CustomButton from "@/components/CustomComponents/CustomButton";
export default function EmailValidatorInput() {
  const { formData, handleSingleDataChange, handleFileDataChange } =
    useToolForm();
  {
    console.log("formData", formData);
  }
  return (
    <Stack pt={4} alignItems={"center"} gap={6} maxWidth={"500px"}>
      <Typography textAlign={"center"}>
        You can enter a single email or upload a file containing a list of
        emails, make sure the file you upload is of .xlsx or .csv format. Also
        make sure the files have headers on the first row.
      </Typography>
      <Stack direction={"row"} gap={2}>
        <CustomTextInput
          placeholder="Enter email to validate"
          value={formData.singleData}
          onChange={handleSingleDataChange}
        />
        {formData.singleData && (
          <CustomButton kind="plain">Validate</CustomButton>
        )}
      </Stack>
      {!formData.singleData && (
        <>
          <Box minWidth={"250px"}>
            <Divider>or</Divider>
          </Box>
          <label style={{ width: "100%" }} htmlFor="fileInput">
            <Box
              border={"2px dashed var(--graylight)"}
              p={3}
              width={"70%"}
              sx={{
                strokeLinecap: "round",
                cursor: "pointer",
                transition: "0.3s all ease",
                ":hover": {
                  bgcolor: "var(--graylighter)",
                  transform: "scale(1.05)",
                },
              }}
              borderRadius={"var(--border-radius)"}
              display={"flex"}
              fontSize={"20px"}
              fontWeight={"bold"}
              color={"var(--graylight)"}
              justifyContent={"center"}
              alignItems={"center"}
              mx={"auto"}
            >
              <FileUploadRoundedIcon sx={{ fontSize: "35px" }} />
              Upload file
            </Box>
          </label>
          <input
            type="file"
            onChange={handleFileDataChange}
            id="fileInput"
            hidden={true}
            accept=".csv,.xls,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          />
          <Box minWidth={"350px"}>
            <Divider />
          </Box>
        </>
      )}
    </Stack>
  );
}
