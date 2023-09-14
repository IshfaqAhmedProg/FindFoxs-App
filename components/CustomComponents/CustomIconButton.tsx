import React from "react";
import { IconButtonProps, IconButton } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

type CustomIconButtonProps = {
  kind?: "icon" | "close";
  loading?: boolean;
} & IconButtonProps;
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

export default function CustomIconButton({
  children,
  kind,
  loading,
  ...iconButtonProps
}: CustomIconButtonProps) {
  switch (kind) {
    case "close":
      return (
        <CloseButton>
          <ClearRoundedIcon />
        </CloseButton>
      );
    default:
      return (
        <IconButton
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
  }
}
