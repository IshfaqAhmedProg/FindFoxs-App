import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Box, Divider, InputAdornment, Stack, Typography } from "@mui/material";
import React from "react";
import { useToolForm } from "@/contexts/ToolFormContext";
import CustomButton from "@/components/CustomComponents/CustomButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DragNDrop from "@/components/ToolsComponents/UtilityComponents/DragNDrop";

interface Props {
  description: string;
  unit: string;
}
export default function ValidatorsInput({ description, unit }: Props) {
  const {
    formData,
    singleDataLoading,
    resetFormData,
    handleTextInputChange,
    handleTextInputSubmit,
  } = useToolForm();

  return (
    <Stack pt={4} alignItems={"center"} gap={6} maxWidth={"500px"}>
      <Typography textAlign={"center"} fontSize={"14px"}>
        {description}
      </Typography>
      <Stack direction={"row"} gap={2} alignItems={"center"} width={"60%"}>
        {formData.textData.length > 0 &&
          (formData.formattedData.length != 0 ? (
            <CheckRoundedIcon color="secondary" />
          ) : (
            <CloseRoundedIcon color="error" />
          ))}
        <CustomTextInput
          placeholder={`Enter ${unit} to validate`}
          value={formData.textData}
          onChange={(e) =>
            handleTextInputChange(e.target.value != "" ? [e.target.value] : [])
          }
          sx={{ width: "100%" }}
          disabled={singleDataLoading}
        />
        {formData.textData.length > 0 && (
          <CustomButton
            kind="plain"
            buttonProps={{
              startIcon: <CancelRoundedIcon />,
              onClick: resetFormData,
              disabled: singleDataLoading,
            }}
          >
            clear
          </CustomButton>
        )}
      </Stack>
      {formData.textData.length > 0 && (
        <CustomButton
          kind="secondary"
          buttonProps={{
            onClick: handleTextInputSubmit,
            disabled: formData.formattedData.length == 0 || singleDataLoading,
            type: "submit",
          }}
        >
          {formData.formattedData.length == 0 ? "Invalid Format" : "Validate"}
        </CustomButton>
      )}
      {formData.textData.length == 0 && (
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
