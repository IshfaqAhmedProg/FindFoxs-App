import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import DisplayArray from "@/components/CustomComponents/DisplayStats/DisplayArray";
import checkIfUrl from "@/shared/functions/checkIfFunctions/checkIfUrl";
import usePasteDetector from "@/shared/hooks/usePasteDetector";
import useToolForm, {
  ToolFormProps,
  initialFormData,
} from "@/shared/hooks/useToolForm";
import { Box, Divider, Typography } from "@mui/material";
import DragNDrop from "../UtilityComponents/DragNDrop";

export default function EmailsAndContactsScraperInput({
  submitTask,
}: ToolFormProps) {
  const {
    formData,
    handleTextMultipleInputChange,
    handleSingleSubmit,
    handleFileDataChange,
    resetFormData,
    loading,
  } = useToolForm({
    checkFunction: checkIfUrl,
    submitTask,
  });
  // Handles the pasted values
  const { handlePaste, handlePasteInputChange, handleEnterPress, inputValue } =
    usePasteDetector({
      handlePastedData: handleTextMultipleInputChange,
      denyRepeat: true,
      limit: 5,
    });
  return (
    <>
      <Typography textAlign={"center"}>
        Enter the urls of the websites you want to scrape. You can also upload a
        .xlsx or .csv file containing the urls. Make sure to check your urls if
        they are valid urls. You are limited to 5 websites per task
      </Typography>
      <CustomTextInput
        placeholder="Enter website url(s) here"
        multiline
        minRows={3}
        sx={{ width: "80%", minWidth: "300px" }}
        value={inputValue}
        onChange={(e) => handlePasteInputChange(e.target.value)}
        onPaste={handlePaste}
        onKeyDown={handleEnterPress}
      />

      {formData.formattedData.length > 0 && (
        <DisplayArray
          array={formData.formattedData}
          clearArray={() => {
            resetFormData();
            handlePasteInputChange("");
          }}
          disableClear={loading}
          title="Websites to scrape"
        />
      )}
      {formData.formattedData.length > 0 && (
        <CustomButton
          kind="secondary"
          loading={loading}
          onClick={handleSingleSubmit}
          disabled={formData.formattedData.length == 0}
          type={"submit"}
        >
          {formData.formattedData.length == 0
            ? "Invalid url(s)"
            : "Scrape Url(s)"}
        </CustomButton>
      )}
      {!inputValue && formData.formattedData.length == 0 && (
        <>
          <Box minWidth={"250px"}>
            <Divider>or</Divider>
          </Box>
          <DragNDrop handleFileDataChange={handleFileDataChange} />
        </>
      )}
    </>
  );
}
