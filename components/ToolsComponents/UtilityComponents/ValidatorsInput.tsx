import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useToolForm } from "@/contexts/ToolFormContext";
import CustomButton from "@/components/CustomComponents/CustomButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

interface Props {
  description: string;
  unit: string;
}
export default function ValidatorsInput({ description, unit }: Props) {
  const {
    formData,
    singleDataLoading,
    resetFormData,
    handleSingleDataChange,
    handleFileDataChange,
    handleSingleInputSubmit,
  } = useToolForm();

  return (
    <Stack pt={4} alignItems={"center"} gap={6} maxWidth={"500px"}>
      <Typography textAlign={"center"}>{description}</Typography>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        {formData.singleData &&
          (formData.formattedData.length != 0 ? (
            <CheckRoundedIcon color="secondary" />
          ) : (
            <CloseRoundedIcon color="error" />
          ))}
        <CustomTextInput
          placeholder={`Enter ${unit} to validate`}
          value={formData.singleData}
          onChange={handleSingleDataChange}
          sx={{ width: "100%" }}
        />
        {formData.singleData && (
          <CustomButton
            kind="plain"
            buttonProps={{
              startIcon: <CancelRoundedIcon />,
              onClick: resetFormData,
            }}
          >
            clear
          </CustomButton>
        )}
      </Stack>
      {formData.singleData && (
        <CustomButton
          loading={singleDataLoading}
          buttonProps={{
            onClick: handleSingleInputSubmit,
            disabled: formData.formattedData.length == 0,
          }}
        >
          {formData.formattedData.length == 0 ? "Invalid Format" : "Validate"}
        </CustomButton>
      )}
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
