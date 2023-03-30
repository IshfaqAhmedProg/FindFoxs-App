import React, { useState } from "react";
import {
  FormControl,
  Input,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import createStyles from "@mui/material/styles/createStyles";

export const FormInput = (props: any) => {
  const { id, helperText, onChange, ...inputProps } = props;
  const [wrongInput, setWrongInput] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    const pattern = new RegExp(inputProps.pattern);
    setWrongInput(!pattern.test(e.target.value) && e.target.value != "");
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        color="secondary"
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
  return (
    <FormControl>
      <InputLabel id={id} color="secondary">
        {inputProps.label}
      </InputLabel>
      <Input
        {...inputProps}
        error={wrongInput}
        onChange={onChange}
        onBlur={handleFocus}
        type={
          inputProps.type == "password"
            ? showPassword
              ? "text"
              : inputProps.type
            : inputProps.type
        }
        endAdornment={inputProps.type == "password" ? passwordAdornment : ""}
        color="secondary"
      />
      <FormHelperText sx={{ width: "35ch", color: "red" }}>
        {wrongInput && helperText}
      </FormHelperText>
    </FormControl>
  );
};
