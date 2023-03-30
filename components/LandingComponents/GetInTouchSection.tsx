import React from "react";
import { Stack, Box } from "@mui/material";
import ContactForm from "./ContactForm";
export default function GetInTouchSection() {
  return (
    <Stack direction="row" width="60vw" justifyContent="space-around">
      <Stack alignItems="center">
        <h2>
          Get in
          <br />
          <span>Touch!</span>
        </h2>
      </Stack>
      <Stack width="50%" gap="1.5rem">
        <h3>Contact us</h3>
        <ContactForm />
      </Stack>
    </Stack>
  );
}
