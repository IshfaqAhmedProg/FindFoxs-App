import { Box, Stack, Typography } from "@mui/material";
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
      minHeight={"100vh"}
    >
      <Stack alignItems="center">
        <Typography variant="h1" textAlign="center" data-aos="fade-up">
          Accelerate Your
        </Typography>
        <Typography
          variant="h1"
          textAlign="center"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <span>Lead Generation</span> With
        </Typography>
        <Typography
          variant="h1"
          textAlign="center"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <span style={{ color: "var(--primary)" }}>
            Find<span style={{ color: "var(--accent)" }}>Foxs</span>
          </span>
        </Typography>
      </Stack>
      <Box
        display="flex"
        gap="1.5em"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-delay="500"
      >
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
      <Box
        sx={{ width: { xs: "90vw", md: "fit-content" } }}
        data-aos="zoom-in"
        data-aos-anchor-placement="top-bottom"
      >
        <Image
          style={{ width: "100%", maxWidth: "54.0625rem", height: "auto" }}
          src={HeroImage}
          alt="Scrape fox. Your one stop for leads needs!"
        />
      </Box>
    </Box>
  );
};
