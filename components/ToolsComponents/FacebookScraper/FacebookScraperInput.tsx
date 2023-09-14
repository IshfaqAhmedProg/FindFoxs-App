import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import DisplayArray from "@/components/CustomComponents/DisplayStats/DisplayArray";
import checkIfFacebookPage from "@/shared/functions/checkIfFunctions/checkIfFacebookPage";
import usePasteDetector from "@/shared/hooks/usePasteDetector";
import useToolForm, {
  ToolFormInputProps,
  initialFormData,
} from "@/shared/hooks/useToolForm";
import { Box, Divider, Typography } from "@mui/material";
import DragNDrop from "../UtilityComponents/DragNDrop";

export default function FacebookScraperInput({
  submitTask,
}: ToolFormInputProps) {
  const {
    formData,
    handleTextMultipleInputChange,
    handleSingleSubmit,
    handleFileDataChange,
    resetFormData,
    loading,
  } = useToolForm({
    initialState: initialFormData,
    submitTask,
    checkFunction: checkIfFacebookPage,
  });
  // Handles the pasted values
  const { handlePaste, handleEnterPress, handlePasteInputChange, inputValue } =
    usePasteDetector({
      handlePastedData: handleTextMultipleInputChange,
      denyRepeat: true,
      limit: 5,
    });
  return (
    <>
      <Typography textAlign={"center"}>
        Enter the urls of the facebook page{"("}s{")"} that you want to scrape.
        You can enter them manually or upload a file containing the facebook
        page urls. You are limited to 5 facebook pages per task.
      </Typography>
      <CustomTextInput
        placeholder="Enter facebook page url(s) here"
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
          title="Pages to scrape"
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
      {/* Prevent showing fileupload if textinput path selected */}
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
