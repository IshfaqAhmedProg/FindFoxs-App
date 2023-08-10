import React from "react";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
const PlainTextInput = styled(TextField)({
  "& fieldset": {
    border: "none",
  },
  background: "var(--graylightest)",

  borderRadius: "var(--border-radius-small)",

  "& .MuiInputBase-input::placeholder": {
    color: "var(--black)",
  },
  "& .MuiInputBase-root": {
    color: "var(--primarydark)",
    height: "inherit",
  },

  "& .Mui-focused": {
    backgroundColor: "var(--white)",
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
          height: "inherit",
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
        },
      }}
      {...props}
    />
  );
}
