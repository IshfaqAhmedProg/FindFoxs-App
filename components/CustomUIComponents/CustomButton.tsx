import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Button, { ButtonProps } from "@mui/material/Button";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
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
}
const PlainButton = styled(Button)({
  bgcolor: "transparent",
  boxShadow: "none",
  fontSize: "14px",
  ":hover": {
    boxShadow: "none",
  },
  padding: "0 8px",
});
const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "1%",
  right: "1%",
});
export default function CustomButton({
  buttonProps,
  iconButtonProps,
  children,
  kind = "primary",
}: Props) {
  switch (kind) {
    case "plain":
      return <PlainButton {...buttonProps}>{children}</PlainButton>;
      break;
    case "close":
      return (
        <CloseButton {...iconButtonProps}>
          <ClearRoundedIcon />
        </CloseButton>
      );
    case "primarylg":
      return (
        <Button
          size="large"
          color="primary"
          sx={{ fontSize: "var(--buttonimpact)", background: "white" }}
          {...buttonProps}
        >
          {children}
        </Button>
      );
      break;
    case "secondarylg":
      return (
        <Button
          size="large"
          variant="contained"
          sx={{
            fontSize: "var(--buttonimpact)",
          }}
          {...buttonProps}
        >
          {children}
        </Button>
      );
      break;
    case "secondary":
      return (
        <Button {...buttonProps} variant="contained" sx={{ color: "white" }}>
          {children}
        </Button>
      );
      break;
    case "icon":
      return <IconButton {...iconButtonProps}>{children}</IconButton>;
      break;
    default:
      return <Button {...buttonProps}>{children}</Button>;
      break;
  }
}
