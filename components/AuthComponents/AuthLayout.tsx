import Image from "next/image";
import React from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useAuthError } from "../../contexts/AuthErrorContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();

  const { errorAlert } = useAuthError();
  const background = (
    <Image
      src="https://source.unsplash.com/random/1280x720/?fox"
      width={1920}
      height={1080}
      alt="background"
      style={{
        objectFit: "cover",
        position: "absolute",
        inset: "0",
        opacity: "1",
        filter: "blur(10px)",
        transform: "scale(1.2)",
      }}
    />
  );
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      maxWidth="100%"
      overflow="hidden"
      position="relative"
    >
      {background}
      {errorAlert}
      <Stack
        px={2}
        py={4}
        width={useMediaQuery(theme.breakpoints.up("md")) ? "60%" : "95%"}
        maxWidth={"42.5rem"}
        height={"65%"}
        gap={3}
        alignItems={"center"}
        justifyContent={
          useMediaQuery(theme.breakpoints.up("sm")) ? "center" : "space-around"
        }
        position={"relative"}
        borderRadius={"var(--border-radius)"}
        bgcolor={"var(--white)"}
        sx={{
          boxShadow: "var(--box-shadow)",
          overflowY: "auto",
        }}
      >
        {children}
      </Stack>
    </Box>
  );
}
