import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Button, { ButtonProps } from "@mui/material/Button";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
interface Props {
  buttonProps?: ButtonProps;
  iconButtonProps?: IconButtonProps;
  children?: string;
  kind: "plain" | "primary" | "secondary" | "close";
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
  kind,
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
    default:
      return <Button {...buttonProps} />;
      break;
  }
}
