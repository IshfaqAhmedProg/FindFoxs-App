import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Box, Divider, Stack, Typography } from "@mui/material";
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
    handleSingleDataChange,
    handleSingleInputSubmit,
  } = useToolForm();

  return (
    <Stack pt={4} alignItems={"center"} gap={6} maxWidth={"500px"}>
      <Typography textAlign={"center"} fontSize={"14px"}>
        {description}
      </Typography>
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
          kind="secondary"
          loading={singleDataLoading}
          buttonProps={{
            onClick: handleSingleInputSubmit,
            disabled: formData.formattedData.length == 0,
            type: "submit",
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
          <DragNDrop />
        </>
      )}
    </Stack>
  );
}
