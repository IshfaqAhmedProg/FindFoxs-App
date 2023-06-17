import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Button, { ButtonProps } from "@mui/material/Button";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { CircularProgress } from "@mui/material";

interface Props {
  buttonProps?: ButtonProps;
  iconButtonProps?: IconButtonProps;
  children?: React.ReactElement | string;
  kind?:
    | "plain"
    | "primary"
    | "primarylg"
    | "secondary"
    | "secondarylg"
    | "icon"
    | "close";
  loading?: boolean;
}
const PlainButton = styled(Button)({
  bgcolor: "transparent",
  boxShadow: "none",
  fontSize: "14px",
  color: "var(--graylight)",
  ":hover": {
    boxShadow: "none",
    color: "var(--primarylight)",
    "& .MuiSvgIcon-root": {
      color: "var(--primarylight)",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "var(--graylight)",
  },
  padding: "0 8px",
});
const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "1%",
  right: "1%",
});
const iconHoverStyle = {
  ":hover": {
    "& .MuiSvgIcon-root": {
      color: "var(--accent)",
    },
  },
};
const loadingIcon = <CircularProgress color="secondary" size={24} />;
export default function CustomButton({
  buttonProps,
  iconButtonProps,
  children,
  kind = "primary",
  loading = false,
}: Props) {
  switch (kind) {
    case "plain":
      return (
        <PlainButton {...buttonProps}>
          {loading ? loadingIcon : children}
        </PlainButton>
      );
      break;
    case "close":
      return (
        <CloseButton {...iconButtonProps}>
          <ClearRoundedIcon />
        </CloseButton>
      );
    case "icon":
      return (
        <IconButton
          {...iconButtonProps}
          sx={{
            "& .MuiSvgIcon-root": { color: "var(--primarylight)" },
            ...iconHoverStyle,
            ...iconButtonProps?.sx,
          }}
        >
          {loading ? loadingIcon : children}
        </IconButton>
      );
      break;
    case "secondarylg":
      return (
        <Button
          size="large"
          variant="contained"
          sx={{
            fontSize: "var(--buttonimpact)",
            ...buttonProps?.sx,
          }}
          {...buttonProps}
        >
          {loading ? loadingIcon : children}
        </Button>
      );
      break;
    case "secondary":
      return (
        <Button
          {...buttonProps}
          variant="contained"
          sx={{
            color: "white",
            ...buttonProps?.sx,
          }}
        >
          {loading ? loadingIcon : children}
        </Button>
      );
      break;
    case "primarylg":
      return (
        <Button
          size="large"
          color="primary"
          sx={{
            fontSize: "var(--buttonimpact)",
            background: "white",
            ...buttonProps?.sx,
          }}
          {...buttonProps}
        >
          {loading ? loadingIcon : children}
        </Button>
      );
      break;
    default:
      return (
        <Button {...buttonProps}>{loading ? loadingIcon : children}</Button>
      );
      break;
  }
}
