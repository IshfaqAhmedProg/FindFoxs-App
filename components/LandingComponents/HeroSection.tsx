import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import Image from "next/image";
import HeroImage from "@/public/Images/HeroImage.png";
export const HeroSection = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
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
          sx={{ fontSize: "1.1em", background: "white" }}
        >
          Try for free
        </Button>
        <Button
          startIcon={<OndemandVideoRoundedIcon />}
          size="large"
          variant="contained"
          sx={{
            fontSize: "1.1em",
          }}
        >
          Watch a video
        </Button>
      </Box>
      <Image src={HeroImage} alt="Scrape fox. Your one stop for leads needs!" />
    </Box>
  );
};
