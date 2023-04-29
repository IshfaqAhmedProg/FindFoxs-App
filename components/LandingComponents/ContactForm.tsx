import React, { useState } from "react";
import { Stack, Box, TextField } from "@mui/material";
import inputs from "@/shared/constants/inputs.json";
import { FormCredentials } from "@/shared/interfaces/FormInputs";
import { FormInput } from "../FormComponents/FormInput";
import Button from "@mui/material/Button";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
export default function ContactForm() {
  const [values, setValues] = useState<FormCredentials>({
    email: "",
    password: "",
    message: "",
  });
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <form>
      <Stack justifyContent="center" gap="1.5rem">
        <Stack direction="row" justifyContent="space-between" gap="1.5rem">
          {inputs.getintouch.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
        </Stack>
        <TextField
          label="Write to us!"
          multiline
          rows={4}
          placeholder="Enter your message"
          variant="standard"
        />

        <Button
          sx={{ marginInline: "auto", background: "white" }}
          endIcon={<SendRoundedIcon />}
          size="large"
        >
          Send
        </Button>
      </Stack>
    </form>
  );
}
