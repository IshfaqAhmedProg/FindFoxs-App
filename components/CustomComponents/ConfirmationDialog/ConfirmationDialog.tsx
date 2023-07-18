import CustomButton from "@/components/CustomComponents/CustomButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
interface Props {
  label: string;
  element?: string;
  message?: React.ReactNode;
  loading?: boolean;
  open: boolean;
  onClose: () => void;
  action: (params: any) => void;
}
export default function ConfirmationDialog({
  label,
  element,
  message,
  loading,
  open,
  onClose,
  action,
}: Props) {
  return (
    <Dialog open={open} id="backdropBlur" fullWidth={true}>
      <DialogTitle>
        <Typography variant="h4">
          {label}&nbsp;
          {element}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack gap={3} alignItems={"center"}>
          {message}
          <Stack direction={"row"} gap={2}>
            <CustomButton
              kind="plain"
              buttonProps={{
                onClick: onClose,
                startIcon: <CancelRoundedIcon />,
                type: "button",
                disabled: loading,
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              kind="secondary"
              loading={loading}
              buttonProps={{ onClick: action }}
            >
              {label}
            </CustomButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
