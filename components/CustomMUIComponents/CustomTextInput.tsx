import React from "react";
import { styled } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
const PlainTextInput = styled(TextField)({
  "& fieldset": {
    border: "none",
  },
  background: "var(--graylighter)",
  borderRadius: 3,
  color: "var(--primarydark)",
  "& input::placeholder": {
    color: "var(--graydark)",
  },
  "& .Mui-focused": {
    backgroundColor: "rgba(250, 250, 250, 1)",
    boxShadow: "inset var(--box-shadow-hover)",
  },
});
export default function CustomTextInput(props: TextFieldProps) {
  return (
    <PlainTextInput
      style={{
        height: "29px",
      }}
      inputProps={{
        style: {
          height: "29px",
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
        },
      }}
      {...props}
    />
  );
}
