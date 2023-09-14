import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

type CustomButtonProps = {
  kind?: "plain" | "primary" | "primarylg" | "secondary" | "secondarylg";
  loading?: boolean;
} & ButtonProps;
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

const loadingIcon = <CircularProgress color="secondary" size={24} />;
export default function CustomButton({
  children,
  kind = "primary",
  loading = false,
  ...buttonProps
}: CustomButtonProps) {
  switch (kind) {
    case "plain":
      return (
        <PlainButton {...buttonProps}>
          {loading ? loadingIcon : children}
        </PlainButton>
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
