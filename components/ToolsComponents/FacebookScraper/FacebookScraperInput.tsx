import CustomBox from "@/components/CustomComponents/CustomBox";
import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { useToolForm } from "@/contexts/ToolFormContext";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Box, Chip, Divider, Stack, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import DragNDrop from "../UtilityComponents/DragNDrop";

export default function FacebookScraperInput() {
  const {
    formData,
    handleTextInputChange,
    handleTextInputSubmit,
    singleDataLoading,
    resetFormData,
  } = useToolForm();
  // {
  //   console.log("formData", formData);
  // }
  const [inputValue, setInputValue] = useState<string>("");
  const handlePasteOrEnter = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pastedUrls = event.clipboardData?.getData("text/plain");
    const newUrls = pastedUrls
      ? pastedUrls.replace(/["']/g, "").split(/\n|,|\s+/)
      : [];
    if (formData.formattedData.indexOf(inputValue) == -1) {
      handleTextInputChange(newUrls);
    }
  };
  return (
    <Stack pt={4} alignItems={"center"} gap={4} maxWidth={"500px"}>
      <Typography textAlign={"center"}>
        Enter the urls of the facebook page{"("}s{")"} that you want to scrape.
        You can enter them manually or upload a file containing the facebook
        page urls.
      </Typography>
      <CustomTextInput
        placeholder="Enter facebook page url(s) here"
        multiline
        minRows={3}
        sx={{ width: "80%", minWidth: "300px" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPaste={handlePasteOrEnter}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (formData.formattedData.indexOf(inputValue) == -1) {
              handleTextInputChange(
                inputValue.replace(/["']/g, "").split(/\n|,|\s+/)
              );
              setInputValue("");
            }
          }
        }}
      />

      {formData.formattedData.length > 0 && (
        <Stack gap={1} width={"80%"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Urls to scrape</Typography>
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
          </Stack>
          <CustomBox
            variant="inner"
            boxProps={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              p: 1,
              gap: 1,
              maxHeight: "250px",
              sx: { overflowY: "auto" },
            }}
          >
            {formData.formattedData.map((text) => {
              return (
                <Tooltip key={text} title={text}>
                  <Chip label={text} size="small" />
                </Tooltip>
              );
            })}
          </CustomBox>
        </Stack>
      )}
      {formData.formattedData.length > 0 && (
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
