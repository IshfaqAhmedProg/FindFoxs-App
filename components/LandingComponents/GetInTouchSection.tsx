"use client"
import React from "react";
import { Stack, Box } from "@mui/material";
import ContactForm from "./ContactForm";
export default function GetInTouchSection() {
  return (
    <Stack
      sx={{ flexDirection: { md: "row", sm: "column" } }}
      width="60vw"
      maxWidth="900px"
      justifyContent="space-around"
      alignItems="center"
    >
      <Stack alignItems="center">
        <h2>
          Get in
          <br />
          <span>Touch!</span>
        </h2>
      </Stack>
      <Stack width="50%" minWidth="315px" gap="1.5rem">
        <h3>Contact us</h3>
        <ContactForm />
      </Stack>
    </Stack>
  );
}
