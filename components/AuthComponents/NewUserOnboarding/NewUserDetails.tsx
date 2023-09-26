import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import CustomButton from "@/components/CustomComponents/CustomButton";
import Stack from "@mui/material/Stack";
export default function VerifyEmail() {
  const { sendEV } = useAuth();
  return (
    <Stack alignItems={"center"} gap={2}>
      <Typography variant="h2" fontWeight={"bold"}>
        Before you get started
      </Typography>
      <Typography variant="h4" color={"var(--primarylight)"}>
        Verify your email
      </Typography>
      <CustomButton kind="plain" onClick={sendEV}>
        Resend Verification Email
      </CustomButton>
    </Stack>
  );
}
