import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import Image from "next/image";
import HeroImage from "@/public/Images/HeroImage.png";
import CustomButton from "../CustomComponents/CustomButton";
export const HeroSection = () => {
  const videoIcon = <OndemandVideoRoundedIcon />;
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
          Find<span style={{ color: "var(--accent)" }}>Foxs</span>
        </span>
      </Typography>
      <Box display="flex" gap="1.5em">
        <CustomButton kind="primarylg">Try for free</CustomButton>
        <CustomButton
          buttonProps={{
            startIcon: videoIcon,
          }}
          kind="secondarylg"
        >
          Watch a video
        </CustomButton>
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
