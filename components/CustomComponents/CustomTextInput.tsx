import React from "react";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
const PlainTextInput = styled(TextField)({
  "& fieldset": {
    border: "none",
  },
  background: "var(--graylighter)",

  borderRadius: "var(--border-radius-small)",
  color: "var(--primarydark)",
  "& input::placeholder": {
    color: "var(--graydark)",
  },
  "& .Mui-focused": {
    backgroundColor: "rgba(250, 250, 250, 1)",
    borderRadius: "var(--border-radius-small)",
    boxShadow: "inset var(--box-shadow-hover)",
  },
});
export default function CustomTextInput(props: TextFieldProps) {
  return (
    <PlainTextInput
      style={{
        minHeight: "35px",
      }}
      inputProps={{
        style: {
          minHeight: "35px",
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
        },
      }}
      {...props}
    />
  );
}
