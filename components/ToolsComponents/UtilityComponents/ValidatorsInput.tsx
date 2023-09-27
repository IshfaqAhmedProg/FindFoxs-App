import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import FormContainer from "@/components/CustomComponents/FormComponents/FormContainer";
import DragNDrop from "@/components/ToolsComponents/UtilityComponents/DragNDrop";
import useToolForm, {
  initialFormData,
  ToolFormInputProps,
} from "@/shared/hooks/useToolForm";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Divider, Stack, Typography } from "@mui/material";

export default function ValidatorsInput({
  description,
  unit,
  submitSingle,
  submitTask,
  checkFunction,
}: ToolFormInputProps) {
  const {
    formData,
    loading,
    handleTextInputChange,
    handleFileDataChange,
    resetFormData,
    handleSingleSubmit,
    headerSelectDialog,
  } = useToolForm({
    initialState: initialFormData,
    checkFunction,
    submitTask,
    submitSingle,
  });

  return (
    <>
      <Typography textAlign={"center"} fontSize={"14px"}>
        {description}
      </Typography>
      <FormContainer onSubmit={handleSingleSubmit} style={{ width: "100%" }}>
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
            onChange={handleTextInputChange}
            sx={{ width: "100%" }}
            disabled={loading}
            inputProps={{
              tabIndex: 1,
              style: {
                minHeight: "40px",
                height: "inherit",
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
              },
            }}
          />
          {formData.textData.length > 0 && (
            <CustomButton
              kind="plain"
              startIcon={<CancelRoundedIcon />}
              onClick={resetFormData}
              disabled={loading}
              tabIndex={2}
            >
              clear
            </CustomButton>
          )}
        </Stack>
        {formData.textData.length > 0 && (
          <CustomButton
            kind="secondary"
            disabled={formData.formattedData.length == 0 || loading}
            type={"submit"}
            tabIndex={3}
          >
            {formData.formattedData.length == 0 ? "Invalid Format" : "Validate"}
          </CustomButton>
        )}
      </FormContainer>
      {formData.textData.length == 0 && (
        <>
          <Box minWidth={"250px"}>
            <Divider>or</Divider>
          </Box>
          <DragNDrop handleFileDataChange={handleFileDataChange} />
        </>
      )}
      {headerSelectDialog}
    </>
  );
}
