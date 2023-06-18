import CustomButton from "@/components/CustomComponents/CustomButton";
import { ValidatorFormData } from "@/shared/interfaces/ToolForm";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
export default function SelectHeaderDialog({
  loading,
  open,
  onClose,
  formData,
  checkData,
  headerSelect,
  handleSubmit,
}: {
  loading?: boolean;
  open: boolean;
  onClose: () => void;
  formData: ValidatorFormData;
  checkData: () => void;
  headerSelect: (value: string | null) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
}) {
  return (
    <Dialog open={open} id="backdropBlur" fullWidth={true}>
      <DialogTitle>
        <Typography variant="h4">Creating New Task</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign={"center"}>
          Select the header for the column containing the data.
        </DialogContentText>
        <Stack gap={3} alignItems={"center"} mt={4}>
          <Stack direction={"row"} gap={2} alignItems={"flex-end"}>
            <Autocomplete
              options={formData.allColumnHeaders}
              disablePortal
              id="selectHeaders"
              sx={{ width: 300 }}
              onChange={(event: any, newValue: string | null) => {
                headerSelect(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  label="Select Header"
                />
              )}
            />
            <CustomButton
              kind="plain"
              buttonProps={{
                startIcon: <PlaylistAddCheckRoundedIcon />,
                sx: { color: "var(--graylight)" },
                onClick: checkData,
                type: "button",
              }}
            >
              {formData.formattedData.length > 0 ? "Checked" : "Check"}
            </CustomButton>
          </Stack>
          <Stack
            alignItems={"center"}
            minHeight={"150px"}
            justifyContent={"center"}
          >
            {formData.extractLength > 0 && (
              <>
                <Typography variant="h4" color={"var(--primary)"}>
                  Found
                </Typography>
                <Typography variant="h3">
                  {formData.formattedData.length}
                </Typography>
                <Typography>
                  valid records out of {formData.extractLength}
                </Typography>
                <Typography
                  textAlign={"center"}
                  fontSize={"12px"}
                  color={"var(--error)"}
                  maxWidth={"35ch"}
                  mt={2}
                >
                  If you&apos;re not getting enough records make sure to check
                  if the data is formatted correctly.
                </Typography>
              </>
            )}
          </Stack>
          {formData.formattedData.length > 0 && (
            <DialogContentText textAlign={"center"}>
              Once you submit, a new task will be created. You can find the
              results for this task in Tasks page once the processing is done.
            </DialogContentText>
          )}
          <Stack direction={"row"} gap={2}>
            <CustomButton
              kind="plain"
              buttonProps={{
                onClick: onClose,
                startIcon: <CancelRoundedIcon />,
                type: "button",
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              kind="secondary"
              loading={loading}
              buttonProps={{
                onClick: handleSubmit,
                type: "submit",
                disabled: formData.formattedData.length == 0,
              }}
            >
              Submit
            </CustomButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
