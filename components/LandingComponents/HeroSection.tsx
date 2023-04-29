import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import Image from "next/image";
import HeroImage from "@/public/Images/HeroImage.png";
export const HeroSection = () => {
  return (
    <Box
      width="100%"
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      gap="2.5rem"
      sx={{ paddingTop: { xs: "3rem", md: "0" } }}
    >
      <Typography variant="h1" textAlign="center">
        Accelerate Your
        <br />
        <span>Lead Generation</span> With
        <br />
        <span style={{ color: "var(--primary)" }}>
          Scrape<span style={{ color: "var(--accent)" }}>Fox</span>
        </span>
      </Typography>
      <Box display="flex" gap="1.5em">
        <Button
          size="large"
          color="primary"
          sx={{ fontSize: "var(--buttonimpact)", background: "white" }}
        >
          Try for free
        </Button>
        <Button
          startIcon={<OndemandVideoRoundedIcon />}
          size="large"
          variant="contained"
          sx={{
            fontSize: "var(--buttonimpact)",
          }}
        >
          Watch a video
        </Button>
      </Box>
      <Box sx={{ width: { xs: "90vw", md: "fit-content" } }}>
        <Image
          style={{ width: "100%", maxWidth: "54.0625rem", height: "auto" }}
          src={HeroImage}
          alt="Scrape fox. Your one stop for leads needs!"
        />
      </Box>
    </Box>
  );
};
